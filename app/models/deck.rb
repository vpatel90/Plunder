class Deck < ActiveRecord::Base
  belongs_to :game
  has_many :deck_cards
end
