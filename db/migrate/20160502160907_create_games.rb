class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :num_players
      t.string :state, default: 'NOT_STARTED'
      t.integer :turn
      t.integer :player_turn
      t.integer :start_count, default: 0

      t.timestamps null: false
    end
  end
end
