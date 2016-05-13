class CheckTurn < ActiveRecord::Base
  belongs_to :game
  belongs_to :player
end
