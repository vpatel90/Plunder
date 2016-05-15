class Game < ActiveRecord::Base
  has_one :board
  has_many :players, dependent: :destroy
  has_one :deck
  has_many :notifications
  has_many :check_turns
  PORTRAITS = ['/assets/pirate1.svg','/assets/pirate2.svg',
               '/assets/pirate3.svg','/assets/pirate4.svg',
               '/assets/pirate5.svg', '/assets/pirate6.svg']


  def start_game
    build_board
    assign_portraits
    build_deck
    deal_cards
    create_chat_room
    set_initial_turn
  end

  def create_chat_room
    ChatRoom.create(game_id: self.id)
  end

  def build_board
    Board.create(game_id: self.id)
  end

  def assign_portraits
    portraits = PORTRAITS.map{|p| p}
    players.each do |player|
      player.update(portrait: portraits.shuffle!.slice!(0,1)[0])
    end
  end

  def build_deck
    Deck.create(game_id: self.id)
    if self.size == "small"
      deck.build_small
    elsif self.size == "sample"
      deck.build_sample
    else
      deck.build
    end
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
    turn = self.check_turns.create(player_id: self.player_turn)
    TurnCheckerJob.set(wait: 94.seconds).perform_later(turn.id)
  end

  def next_turn
    if game_over?
        end_game
    else
      self.turn += 1
      if self.turn > self.players.length
        self.turn = 1
      end
      self.check_turns.last.update(completed: true)
      self.player_turn = self.players.find_nth(self.turn, -1).id
      self.save
      turn = self.check_turns.create(player_id: self.player_turn)
      TurnCheckerJob.set(wait: 94.seconds).perform_later(turn.id)
      collect_ships(self.player_turn)
      if Player.find(self.player_turn).booted
        self.next_turn
      end
      check_valid_move(self.player_turn)
    end
  end

  def check_valid_move(player_id)
    return if self.deck.deck_cards.count > 0
    player = Player.find(player_id)

    valid_cards = player.cards.select{|card| card.category == "M"}
    if valid_cards.count > 0
      player.update(valid_moves: true)
    elsif valid_cards.count == 0 && self.board.merchants.count == 0
      player.update(valid_moves: false)
    else
      if check_all_cards(player)
        player.update(valid_moves: true)
      else
        player.update(valid_moves: false)
      end
    end
  end

## CHECK THIS IF VALID MOVE VALIDATION BREAKS
  def check_all_cards(player)
    pcards = player.cards.select{|card| card.category == "P"}
    pcards.any? do |pcard|
      check_all_merchants(player, pcard)
    end
  end

  def check_all_merchants(player, pcard)
    mcards = self.board.merchants
    mcards.any? do |mcard|
      player.valid_color?(pcard, mcard)
    end
  end

  def check_all_merchants_return_valid(player, pcard)
    mcards = self.board.merchants
    valid_ships = []
    mcards.each do |mcard|
      if player.valid_color?(pcard, mcard)
        valid_ships << mcard.id
      end
    end
    valid_ships
  end

  def end_game
    self.player_turn = 0
    self.state = "ENDING"
    self.save
    set_winner
    reset_user_games
  end

  def reset_user_games
    players.each do |player|
      player.user.update(current_game: nil)
    end
  end

  def game_over?
    return true if players.select{|p| p.booted == true}.count == players.count - 1
    return false if deck.deck_cards.count > 0
    players.each do |player|
      if player.hand_cards.count == 0
        return true
      end
    end
    return true if players.select{|p| p.valid_moves == false}.count == players.count
    return false
  end

  def standardize_score
    players.each do |player|
      mercs_in_hand = player.cards.select{|card| card.category == "M"}
      mercs_in_hand.each do |merc|
        player.score -= merc.value
      end
      player.save
    end
  end

  def set_winner
    standardize_score
    score = 0
    winner = []
    players.each do |player|
      unless player.booted
        if player.score > score
          score = player.score
          winner = [player]
        elsif player.score == score
          winner << player
        else
        end
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
    captured_ships.each do |ship|
      player.score += ship.card.value
      self.notifications.create(body: "#{player.user_name} captures Merchant with #{ship.value} gold")
    end

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
