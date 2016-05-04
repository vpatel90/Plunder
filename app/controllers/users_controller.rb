class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "Welcome to Chattr!"
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:alert] = "Something went wrong! Try again"
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
