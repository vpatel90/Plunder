class PlayersController < ApplicationController
  def show
    @game = get_game
    @player = get_player
    @total_cards = @game.deck.deck_cards.count
    respond_to do |format|
      format.html {}
      format.json { render json: { player: @player,
                                   player_cards: @player.cards,
                                   total_cards: @total_cards,
                                   game: @game }}
    end
  end

  def draw
    player = get_player
    game = get_game
    if player.id == game.player_turn
      game.deck.draw(player)
      game.next_turn
      respond_to do |format|
        format.json {render json: {message: 'success'} }
      end
    else
      respond_to do |format|
        format.json {render json: {message: 'failure'} }
      end
    end
  end

  def play
    player = get_player
    game = get_game
    if player.id == game.player_turn
      player.play(params[:card_id], params[:ship_id])
      game.next_turn
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

  def get_game
    Game.find(params[:game_id])
  end

  def get_player
    Player.find(params[:id])
  end
end
