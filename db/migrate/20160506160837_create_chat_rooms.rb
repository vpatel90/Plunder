class CreateChatRooms < ActiveRecord::Migration
  def change
    create_table :chat_rooms do |t|
      t.integer :game_id

      t.timestamps null: false
    end
  end
end
