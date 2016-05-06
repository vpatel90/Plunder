class GamesController < ApplicationController
  def index
    @games = Game.where(state: 'NOT_STARTED')
    respond_to do |format|
      format.html {}
      format.json { render json: { games: @games, user:current_user } }
    end
  end

  def show
    @game = get_game
    @players = @game.players.select{|player| player.user_id != current_user.id}
    @current_player = @game.players.find_by(user_id: current_user.id)
    @board = @game.board
    respond_to do |format|
      format.html {}
      format.json { render json: { game: @game,
                                   other_players: @players,
                                   user_player: @current_player,
                                   board: @board,
                                   board_ships: @board.merchants
                                    }}
    end
  end

  def new
    @game = Game.new
  end

  def create
    unless in_game?
      game = Game.create(game_params)
      game.players.create(user_id: current_user.id)
      current_user.update(current_game: game.id)
    end
    redirect_to root_path
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
    game.players.create(user_id: current_user.id)
    current_user.update(current_game: game.id)
    respond_to do |format|
      format.json {render json: {message: 'success'} }
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
    elsif player.ready == true
      game.start_count -= 1
      game.save
      player.update(ready: false)
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
    params.require(:game).permit(:name, :num_players)
  end
end
