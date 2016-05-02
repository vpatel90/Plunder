class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def signed_in?
  session[:user_id].present?
  end
  helper_method :signed_in? # Make this method available on the view as a helper

  def current_user
    return if session[:user_id].nil?
    @current_user ||= User.find(session[:user_id]) # Return the current_user
  end
  helper_method :current_user # Make this method available on the view as a helper
end
