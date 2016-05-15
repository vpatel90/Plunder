class LobbyController < ApplicationController
  def index
    @game = Game.new
  end

  def about

  end

  def chat
    @messages= ChatRoom.find_by(game_id: 0).messages
    respond_to do |format|
      format.json {render json: @messages }
    end
  end

  def new_message
    @chat = ChatRoom.find_by(game_id: 0)
    @chat.messages.create(user: current_user, body: params[:message][:body])
    respond_to do |format|
      format.json {render json: {message: 'success'} }
    end
  end
end
