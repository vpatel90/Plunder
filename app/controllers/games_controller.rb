class GamesController < ApplicationController
  def index
    @games = Game.all
    respond_to do |format|
      format.html {}
      format.json { render json: @games }
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

  private
  def get_game
  end

  def game_params
    params.require(:game).permit(:name, :num_players)
  end
end
