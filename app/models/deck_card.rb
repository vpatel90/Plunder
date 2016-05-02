class DeckCard < ActiveRecord::Base
  belongs_to :card
  belongs_to :deck
end
