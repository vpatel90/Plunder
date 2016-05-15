class AddTurnStartedToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :turn_started, :boolean, default: false
  end
end
