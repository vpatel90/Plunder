class GamesController < ApplicationController
  def index
    @games = Game.all
    respond_to do |format|
      format.html {}
      format.json { render json: { games: @games, user:current_user } }
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

  private
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
