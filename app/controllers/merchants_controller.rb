class MerchantsController < ApplicationController
  def show
    merchant = Merchant.find(params[:id])
    @pirates = merchant.pirates
    respond_to do |format|
      format.html {}
      format.json { render json: { pirates: @pirates } }
    end
  end
end
