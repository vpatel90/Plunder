class CreateCheckTurns < ActiveRecord::Migration
  def change
    create_table :check_turns do |t|
      t.belongs_to :game, index: true, foreign_key: true
      t.belongs_to :player, index: true, foreign_key: true
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
