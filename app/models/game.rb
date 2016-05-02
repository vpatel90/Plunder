class Game < ActiveRecord::Base
  has_one :board
  has_many :players
  has_one :deck

  def start_game
    build_board
    build_deck
    deal_cards
  end

  def build_board
    Board.create(game_id: self.id)
  end

  def build_deck
    Deck.create(game_id: self.id)
    deck.build
  end

  def deal_cards
    players.each do |player|
      6.times do
        deck.draw(player)
      end
    end
  end
end
