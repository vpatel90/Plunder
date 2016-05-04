class User < ActiveRecord::Base
  has_many :players

  def game_started
    return if current_game == nil
    game = players.last.game
    return false if game.state == 'NOT_STARTED' || game.state == 'ENDING'
    return true
  end

  def as_json(_ = nil)
    super(methods: [:game_started])
  end
end
