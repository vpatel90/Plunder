class AddPortUrlColToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :portrait, :string
  end
end
