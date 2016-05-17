class Deck < ActiveRecord::Base
  belongs_to :game
  has_many :deck_cards

  def build
    build_deck(Card.all)
  end

  def build_small
    cards = Card.where(id: [1,2,3,4,5,6,7,8,16,17,23,25,
                            26,27,30,31,34,35,
                            38,39,42,43,46,47,
                            50,51,54,55,58,59,
                            62,63,66,67,70,71,])
    build_deck(cards)
  end

  def build_sample
    cards = Card.where(id: [1,4,5,6,16,
                            26,31,34,
                            38,43,46,
                            50,54,55,58,
                            62,66,67,70,])
    build_deck(cards)

  end



  def build_deck(cards)
    cards.each do |card|
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
