class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :chat_room, index: true, foreign_key: true
      t.boolean :private, default: false
      t.integer :target_id, default: 0
      t.string :body, null: false

      t.timestamps null: false
    end
  end
end
