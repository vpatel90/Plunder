Given(/^I have a Game Created$/) do
  g = Game.create(name: "Test game", num_players: 3, size: "Short")
end

Given(/^I have a Game with Players Created$/) do
  @g = Game.create(name: "Test players game", num_players: 3, start_count: 2, size: "Short")
  @g.players.create(user_id: 2, ready: true)
  @g.players.create(user_id: 3, ready: true)
end

Given(/^I have a two player game$/) do
  @g = Game.create(name: "Test players game", num_players: 2, start_count: 2, size: "Large")
  p1 = @g.players.create(user_id: 1, ready: true)
  p2 = @g.players.create(user_id: 2, ready: true)
  @g.build_board
  @g.assign_portraits
  @g.build_deck
  deck = @g.deck
  @g.create_chat_room
  p1.hand_cards.create(card_id: 1)
  p1.hand_cards.create(card_id: 2)
  p1.hand_cards.create(card_id: 3)
  deck.deck_cards.delete(1)
  deck.deck_cards.delete(2)
  deck.deck_cards.delete(3)
  3.times{deck.draw(p1)}
  6.times{deck.draw(p2)}
  @g.turn = 1
  @g.player_turn = p1.id
  @g.check_turns.create(player_id: p1.id)
  @g.state = "STARTED"
  @g.save

end

Then(/^I visit game show path$/) do
  visit("/games/#{@g.id}")

end
