class User < ActiveRecord::Base
  has_many :players

  validates :name, uniqueness: { case_sensitive: false, message: "Name is unavailable" }

  has_secure_password

  validates :password, length: { minimum: 8, message: "Password must be at least 8 characters" }, allow_nil: true

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
