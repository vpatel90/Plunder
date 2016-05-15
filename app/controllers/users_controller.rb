class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "Welcome to Plunder!"
      session[:user_id] = @user.id
      render json: {message: "success"}
    else
      flash[:alert] = "Something went wrong! Try again"
      render json: @user.errors.as_json, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
