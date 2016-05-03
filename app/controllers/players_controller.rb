class PlayersController < ApplicationController
  def show
    @game = get_game
    @player = get_player
    respond_to do |format|
      format.html {}
      format.json { render json: { player_cards: @player.cards,
                                   game: @game }}
    end
  end

  private

  def get_game
    Game.find(params[:game_id])
  end

  def get_player
    Player.find(params[:id])
  end
end
