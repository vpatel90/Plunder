class LobbyController < ApplicationController
  def index
    @users = User.all
  end
end
