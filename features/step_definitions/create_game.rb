Given(/^I have a Game Created$/) do
  g = Game.create(name: "Test game", num_players: 3, size: "small")
end

Given(/^I have a Game with Players Created$/) do
  @g = Game.create(name: "Test players game", num_players: 3, start_count: 2, size: "small")
  @g.players.create(user_id: 2, ready: true)
  @g.players.create(user_id: 3, ready: true)
end

Then(/^I visit game show path$/) do
  visit("/games/#{@g.id}")

end
