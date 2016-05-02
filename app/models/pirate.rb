class Pirate < ActiveRecord::Base
  belongs_to :player
  belongs_to :board
  belongs_to :merchant
  belongs_to :card
end
