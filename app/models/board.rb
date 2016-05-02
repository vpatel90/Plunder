class Board < ActiveRecord::Base
  belongs_to :game
  has_many :pirates
  has_many :merchants
end
