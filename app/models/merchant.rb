class Merchant < ActiveRecord::Base
  belongs_to :player
  belongs_to :board
  belongs_to :card
  has_many :pirates, dependent: :destroy
  has_many :pirate_cards, through: :pirates, source: :card

  def category
    get_card.category
  end

  def value
    get_card.value
  end

  def color
    get_card.color
  end

  def leader_name
    if leader == 0
      "Tie"
    else
      Player.find(leader).user.name
    end
  end

  def get_card
    Card.find(card_id)
  end

  def blue_pirates
    pirates.joins(:card).where("color = 'blue'")
  end

  def green_pirates
    pirates.joins(:card).where("color = 'green'")
  end

  def purple_pirates
    pirates.joins(:card).where("color = 'purple'")
  end

  def gold_pirates
    pirates.joins(:card).where("color = 'gold'")
  end

  def set_leader
    colors = ['blue','green','purple','gold']
    leader = nil
    sum = 0
    colors.each do |color|
      cards = self.pirate_cards.where(color: color)

      unless cards.empty?
        new_sum = 0
        new_leader = pirates.find_by(card_id: cards.first.id).player.id
        cards.each do |card|
          new_sum += card.value
        end

        if new_sum > sum
          sum = new_sum
          leader = new_leader
        elsif new_sum == sum
          leader = 0
        end
      end
    end
    self.leader = leader
    self.lead_cannons = sum
    self.save
  end

  def as_json(_ = nil)
    super(methods: [:category, :value, :color, :leader_name,
                    :blue_pirates, :green_pirates, :purple_pirates, :gold_pirates],
          include: [pirates: { methods: [:category, :value, :color, :owner_name]}])
  end
end
