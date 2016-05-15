class SessionsController < ApplicationController
  def sign_in
  end

  def create
    user = User.find_by(name: params[:login_name])

    if user && user.authenticate(params[:login_password])
      session[:user_id] = user.id
      render json: {message: "success"}
    else
      render json: 'Name and Password do not match', status: :unprocessable_entity
    end
  end

  def sign_out
    session[:user_id] = nil
    redirect_to root_path
  end
end
