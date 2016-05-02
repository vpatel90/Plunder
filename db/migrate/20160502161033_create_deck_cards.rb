class CreateDeckCards < ActiveRecord::Migration
  def change
    create_table :deck_cards do |t|
      t.belongs_to :card, index: true, foreign_key: true
      t.belongs_to :deck, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
