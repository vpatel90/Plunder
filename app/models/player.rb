class Player < ActiveRecord::Base
  belongs_to :game
  belongs_to :user
  has_many :hand_cards
  has_many :merchants
  has_many :pirates
  has_one :board, through: :game, source: :board
end
