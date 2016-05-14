Given(/^I have a Game Created$/) do
  g = Game.create(name: "Test game", num_players: 3, size: "small")
end
