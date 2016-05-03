class Player < ActiveRecord::Base
  belongs_to :game
  belongs_to :user
  has_many :hand_cards, dependent: :destroy
  has_many :cards, through: :hand_cards, source: :card
  has_many :merchants
  has_many :pirates
  has_one :board, through: :game, source: :board

  def play(card_id, target_id)
    card = get_card(card_id)
    merc = Merchant.find(target_id) unless target_id == '0'
    hand_card = get_hand_card(card_id)
    if card.category == 'M'
      self.merchants.create(board_id: 1, card_id: card_id, leader: self.id, lead_cannons: 0)
    elsif card.category == 'P'
      if valid_color?(card, merc)
        self.pirates.create(board_id: 1, merchant_id: target_id, card_id: card_id)
        merc.set_leader
      else
        return
      end
    end
    self.cards.delete(card_id)
    hand_card.destroy
  end

  def valid_color?(card, merc)
    find_card = merc.pirate_cards.where(color: card.color).first
    return true if find_card.nil?
    return true if merc.pirates.where(card_id: find_card.id).first.player == self
    return false
  end

  def get_card(id)
    Card.find(id)
  end

  def get_hand_card(id)
    HandCard.find_by(card_id: id)
  end

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
