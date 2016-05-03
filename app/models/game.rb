class Game < ActiveRecord::Base
  has_one :board
  has_many :players, dependent: :destroy
  has_one :deck

  def start_game
    build_board
    build_deck
    deal_cards
    set_initial_turn
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

  def set_initial_turn
    self.turn = rand(1..self.players.length)
    self.player_turn = self.players.find_nth(self.turn, -1).id
    self.save
  end

  def next_turn
    self.turn += 1
    if self.turn > self.players.length
      self.turn = 1
    end
    self.player_turn = self.players.find_nth(self.turn, -1).id
    self.save
  end

  def player_count
    players.count
  end

  def has_user?(user)
    players.map{|x|x.user_id}.include?(user.id)
  end

  def as_json(_ = nil)
    super(methods: [:player_count])
  end
end
