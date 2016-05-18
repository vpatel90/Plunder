class GamesController < ApplicationController
  def index
    @games = Game.where(state: 'NOT_STARTED')
    if current_user && current_user.current_game
      @current_game = Game.find(current_user.current_game)
    end
    respond_to do |format|
      format.html {}
      format.json { render json: { games: @games, user: current_user,
                                     current_game: @current_game,
                                     current_players: @current_game.try(:players) } }
    end
  end

  def show
    @game = get_game
    @players = @game.players.order(id: :asc)
    @current_player = @game.players.find_by(user_id: current_user.id)
    @board = @game.board
    @board_ships = @board.merchants.order(created_at: :asc)
    @valid_ships = []
    @turn_start = @game.check_turns.last.created_at.to_i
    unless params[:card_id] == '0' || params[:card_id].nil?
      @valid_ships = @game.check_all_merchants_return_valid(@current_player, Card.find(params[:card_id]))
    end
    respond_to do |format|
      format.html {}
      format.json { render json: { game: @game,
                                   other_players: @players,
                                   user_player: @current_player,
                                   board: @board,
                                   board_ships: @board_ships,
                                   notifications: @game.notifications,
                                   valid_ships: @valid_ships,
                                   turn_start: @turn_start
                                    }}
    end
  end

  def new
    @game = Game.new
  end

  def create
    unless in_game?
      game = Game.new(game_params)
      if game.save
        game.players.create(user_id: current_user.id)
        current_user.update(current_game: game.id)
        redirect_to root_path
      else
        redirect_to root_path
      end
    end
  end

  def edit
  end

  def update
  end

  def leave
    game = get_game
    player = get_player(game)
    player.destroy
    current_user.update(current_game: nil)
    game.start_count -= 1 if player.ready == true
    game.save
    game.destroy if game.players.length == 0
    respond_to do |format|
      format.json {render json: {message: 'success'} }
    end
  end

  def join
    game = get_game
    if current_user.current_game.nil?
      game.players.create(user_id: current_user.id)
      current_user.update(current_game: game.id)
      respond_to do |format|
        format.json {render json: {message: 'success'} }
      end
    else
      render json: {message: 'failure'}, status: :unprocessable_entity
    end
  end

  def start
    game = get_game
    player = get_player(game)
    if player && player.ready == false
      game.start_count += 1
      game.save
      player.update(ready: true)
      check_start
      respond_to do |format|
        format.json {render json: {message: 'success'} }
      end
    else
      respond_to do |format|
        format.json {render json: {message: 'failure'} }
      end
    end
  end

  def new_message
    @game = get_game
    @chat = ChatRoom.find_by(game_id: @game.id)
    @chat.messages.create(user: current_user, body: params[:message][:body])
    respond_to do |format|
      format.json {render json: {message: 'success'} }
    end
  end


  private
  def check_start
    game = get_game
    if game.start_count == game.num_players
      game.update(state: "STARTED")
      game.start_game
    end
  end

  def get_game
    Game.find(params[:id])
  end

  def get_player(game)
    game.players.find_by(user_id: current_user.id)
  end

  def game_params
    params.require(:game).permit(:name, :num_players, :size)
  end
end
