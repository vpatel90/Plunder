class User < ActiveRecord::Base
  has_one :player

  def game_started
    return if current_game == nil
    game = player.game
    return false if game.state == 'NOT_STARTED'
    return true
  end

  def as_json(_ = nil)
    super(methods: [:game_started])
  end
end
