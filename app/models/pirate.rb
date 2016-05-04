class Pirate < ActiveRecord::Base
  belongs_to :player
  belongs_to :board
  belongs_to :merchant
  belongs_to :card

  def category
    get_card.category
  end

  def value
    get_card.value
  end

  def color
    get_card.color
  end

  def owner_name
    player.user.name
  end

  def get_card
    Card.find(card_id)
  end

  def as_json(_ = nil)
    super(methods: [:category, :value, :color, :owner_name])
  end
end
