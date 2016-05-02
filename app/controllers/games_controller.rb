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
    game.start_count -= 1
    game.save
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

  private
  def check_start
    game = get_game
    if game.start_count == game.players.count
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
