class CreateMerchants < ActiveRecord::Migration
  def change
    create_table :merchants do |t|
      t.belongs_to :player, index: true, foreign_key: true
      t.belongs_to :board, index: true, foreign_key: true
      t.belongs_to :card, index: true, foreign_key: true
      t.integer :leader
      t.integer :lead_cannons

      t.timestamps null: false
    end
  end
end
