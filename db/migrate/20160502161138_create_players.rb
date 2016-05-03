class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.belongs_to :game, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true
      t.integer :score, default: 0
      t.integer :captured_ships, default: 0
      t.boolean :winner
      t.boolean :ready, default: false

      t.timestamps null: false
    end
  end
end
