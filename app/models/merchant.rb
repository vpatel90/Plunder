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

  def all_pirates
    { blue: blue_pirates_sum, green: green_pirates_sum, purple: purple_pirates_sum, gold: gold_pirates_sum }
  end

  def blue_pirates_sum
    cards = pirates.joins(:card).where("color = 'blue'")
    sum = cards.map(&:value).sum
    blue_lead = cards.first.player unless cards.empty?
    { sum: sum, leader: blue_lead }
  end

  def green_pirates_sum
    cards = pirates.joins(:card).where("color = 'green'")
    sum = cards.map(&:value).sum
    green_lead = cards.first.player unless cards.empty?
    { sum: sum, leader: green_lead }
  end

  def purple_pirates_sum
    cards = pirates.joins(:card).where("color = 'purple'")
    sum = cards.map(&:value).sum
    purple_lead = cards.first.player unless cards.empty?
    { sum: sum, leader: purple_lead }
  end

  def gold_pirates_sum
    cards = pirates.joins(:card).where("color = 'gold'")
    sum = cards.map(&:value).sum
    gold_lead = cards.first.player unless cards.empty?
    { sum: sum, leader: gold_lead }
  end

  def set_leader
    colors = ['blue','green','purple','gold']
    temp_leader = nil
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
          temp_leader = new_leader
        elsif new_sum == sum
          temp_leader = 0
        end
      end
    end
    self.leader = temp_leader
    self.lead_cannons = sum
    self.save
  end

  def as_json(_ = nil)
    super(methods: [:category, :value, :color, :leader_name,
                    :blue_pirates, :all_pirates],
          include: [pirates: { methods: [:category, :value, :color, :owner_name]}])
  end
end
