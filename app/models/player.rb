class Player < ActiveRecord::Base
  belongs_to :game
  belongs_to :user
  has_many :hand_cards, dependent: :destroy
  has_many :merchants
  has_many :pirates
  has_one :board, through: :game, source: :board


  def user_name
    user.name
  end

  def card_count
    hand_cards.count
  end

  def as_json(_ = nil)
    super(methods: [:user_name, :card_count])
  end
end
