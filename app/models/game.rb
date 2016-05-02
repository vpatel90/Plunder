class Game < ActiveRecord::Base
  has_one :board
  has_many :players
  has_one :deck
end
