class PlayersController < ApplicationController
  def show
    @game = get_game
    @messages = ChatRoom.find_by(game_id: @game.id).messages
    @messages = @messages + @game.notifications
    @messages = @messages.sort_by{|obj| obj.created_at}
    @player = get_player
    @total_cards = @game.deck.deck_cards.count
    respond_to do |format|
      format.html {}
      format.json { render json: { player: @player,
                                   player_cards: @player.cards,
                                   total_cards: @total_cards,
                                   game: @game,
                                   messages: @messages}}

    end
  end

  def draw
    player = get_player
    game = get_game
    if player.id == game.player_turn && player.turn_started == false
      start_turn(player)
      player.update(turn_started: true)
      game.deck.draw(player)
      game.notifications.create(body: "#{player.user_name} drew a card")
      end_turn(player)
      game.next_turn
      respond_to do |format|
        format.json {render json: {message: 'success'} }
      end
    else
      respond_to do |format|
        format.json {render json: {message: 'failure'}, status: :unprocessable_entity }
      end
    end
  end

  def play
    player = get_player
    game = get_game
    if player.id == game.player_turn && player.turn_started == false
      start_turn(player)
      if player.play(params[:card_id], params[:ship_id])
        end_turn(player)
        game.next_turn
        respond_to do |format|
          format.json {render json: {message: 'success'} }
        end
      else
        end_turn(player)
        respond_to do |format|
          format.json {render json: {message: 'failure'}, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.json {render json: {message: 'failure'}, status: :unprocessable_entity }
      end
    end

  end

  def skip
    player = get_player
    game = get_game
    if player.id == game.player_turn && player.turn_started == false
      start_turn(player)
      game.notifications.create(body: "#{player.user_name} passed their turn")
      end_turn(player)
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

  def start_turn(player)
    player.update(turn_started: true)
  end

  def end_turn(player)
    player.update(turn_started: false)
  end
end
