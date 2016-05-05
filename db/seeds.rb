# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(name:"Jack Sparrow", password: "password")
User.create(name:"Hector Barbossa", password: "password")
User.create(name:"Bloody Bess", password: "password")
User.create(name:"James Hook", password: "password")
User.create(name:"Captain Morgan", password: "password")
User.create(name:"Blackbeard", password: "password")
User.create(name:"Elizabet Ramsey", password: "password")
### Merchant Cards ###
5.times do
  Card.create(category: 'M', value: 2, color: 'white')
  Card.create(category: 'M', value: 4, color: 'white')
  Card.create(category: 'M', value: 5, color: 'white')
end

6.times do
  Card.create(category: 'M', value: 3, color: 'white')
end

2.times do
  Card.create(category: 'M', value: 6, color: 'white')
end

Card.create(category: 'M', value: 7, color: 'white')
Card.create(category: 'M', value: 8, color: 'white')


# Card.create(category: 'A', color: 'white')

### Pirate Cards ###
colors = ['blue','green','purple','gold']

colors.each do |color|
  # Card.create(category: 'C', color: color)


  2.times do
    Card.create(category: 'P', value: 1, color: color)
    Card.create(category: 'P', value: 4, color: color)
  end
  4.times do
    Card.create(category: 'P', value: 2, color: color)
    Card.create(category: 'P', value: 3, color: color)
  end
end

# g = Game.create(name: "First Game", num_players: 2)
# g.players.create(user_id: 3)
# g.players.create(user_id: 4)
# g.players.each do |player|
#   player.user.update(current_game: g.id)
# end
