class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :body, null: false
      t.belongs_to :game, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
