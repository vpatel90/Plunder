class SessionsController < ApplicationController
  def sign_in
  end

  def create
    user = User.find_by(name: params[:name])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash[:alert] = "Username and password do not match"
      redirect_to root_path
    end
  end

  def sign_out
    session[:user_id] = nil
    redirect_to root_path
  end
end
