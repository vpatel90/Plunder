class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :num_players
      t.string :state
      t.integer :turn
      t.integer :player_turn

      t.timestamps null: false
    end
  end
end
