class AddBootedAndAfkCountColsToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :booted, :boolean, default: false
    add_column :players, :afk_count, :integer, default: 0
  end
end
