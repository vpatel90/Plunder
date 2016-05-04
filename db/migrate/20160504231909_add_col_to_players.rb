class AddColToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :valid_moves, :boolean, default: true
  end
end
