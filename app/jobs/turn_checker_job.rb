class TurnCheckerJob < ActiveJob::Base
  queue_as :default

  def perform(check_turn_id)
    turn = CheckTurn.find(check_turn_id)
    unless turn.completed
      count = turn.player.afk_count
      turn.player.update(afk_count: count + 1)
      if turn.player.afk_count >= 2
        turn.player.update(booted: true, valid_moves: false, score: -50)
      end
      turn.player.game.next_turn
    end
  end
end
