class MerchantsController < ApplicationController
  def show
    merchant = Merchant.find(params[:id])
    blue_pirates = merchant.pirates.joins(:card).where("color = 'blue'")
    green_pirates = merchant.pirates.joins(:card).where("color = 'green'")
    purple_pirates = merchant.pirates.joins(:card).where("color = 'purple'")
    gold_pirates = merchant.pirates.joins(:card).where("color = 'gold'")

    respond_to do |format|
      format.html {}
      format.json { render json: { blue_pirates: blue_pirates,
                                   green_pirates: green_pirates,
                                   purple_pirates: purple_pirates,
                                   gold_pirates: gold_pirates} }
    end
  end
end
