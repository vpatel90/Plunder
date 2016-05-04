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
    if game_over?
      self.player_turn = 0
      self.state = "ENDING"
      self.save
      set_winner
      reset_user_games
    else
      self.turn += 1
      if self.turn > self.players.length
        self.turn = 1
      end
      self.player_turn = self.players.find_nth(self.turn, -1).id
      self.save
      collect_ships(self.player_turn)
    end
  end

  def reset_user_games
    players.each do |player|
      palyer.user.update(current_game: nil)
    end
  end

  def game_over?
    return false if deck.deck_cards.count > 0
    players.each do |player|
      if player.hand_cards.count == 0
        return true
      end
    end
    return false
  end

  def set_winner
    score = 0
    winner = []
    players.each do |player|
      if player.score > score
        score = player.score
        winner = [player]
      elsif player.score == score
        winner << player
      end
    end
    winner.each do |player|
      player.update(winner: true)
    end
  end

  def winners
    players.where(winner: true)
  end

  def collect_ships(player_id)
    ships = board.merchants
    player = Player.find(player_id)
    captured_ships = ships.select{ |ship| ship.leader == player_id }
    captured_ships.each{ |ship| player.score += ship.card.value }
    captured_ships.each{ |ship| ship.destroy }
    player.save
  end

  def player_count
    players.count
  end

  def has_user?(user)
    players.map{|x|x.user_id}.include?(user.id)
  end

  def as_json(_ = nil)
    super(methods: [:player_count, :winners])
  end
end
