class ChatRoom < ActiveRecord::Base
  has_many :messages

  def get_messages_as_strings
    arr = []
    messages.all.each do |message|
      arr << "#{message.user.name}: #{message.body}"
    end
    arr
  end
end
