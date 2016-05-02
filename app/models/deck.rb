class Deck < ActiveRecord::Base
  belongs_to :game
  has_many :deck_cards

  def build
    Card.all.each do |card|
      self.deck_cards.create(card: card)
    end
  end

  def draw(player)
    card = deck_cards.sample
    player.hand_cards.create(card_id: card.card_id)
    deck_cards.delete(card.id)
    self.save
  end
end
