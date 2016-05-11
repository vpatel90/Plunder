class AddSizeColToGames < ActiveRecord::Migration
  def change
    add_column :games, :size, :string
  end
end
