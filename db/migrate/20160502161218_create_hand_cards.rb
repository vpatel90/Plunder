class CreateHandCards < ActiveRecord::Migration
  def change
    create_table :hand_cards do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.belongs_to :card, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
