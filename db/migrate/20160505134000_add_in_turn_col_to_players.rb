class AddInTurnColToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :in_turn, :boolean, default: false
  end
end
