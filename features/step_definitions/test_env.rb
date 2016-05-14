Given(/^I have a Test Environment$/) do
  User.create(name:"Test1", password:"password")
  User.create(name:"Test2", password:"password")
  User.create(name:"Test3", password:"password")
  User.create(name:"Test4", password:"password")
  User.create(name:"Test5", password:"password")

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

  ChatRoom.create(game_id: 0)
end
