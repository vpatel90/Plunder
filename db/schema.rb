# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160506161121) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "boards", ["game_id"], name: "index_boards_on_game_id", using: :btree

  create_table "cards", force: :cascade do |t|
    t.string   "category",   null: false
    t.integer  "value"
    t.string   "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chat_rooms", force: :cascade do |t|
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "deck_cards", force: :cascade do |t|
    t.integer  "card_id"
    t.integer  "deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "deck_cards", ["card_id"], name: "index_deck_cards_on_card_id", using: :btree
  add_index "deck_cards", ["deck_id"], name: "index_deck_cards_on_deck_id", using: :btree

  create_table "decks", force: :cascade do |t|
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "decks", ["game_id"], name: "index_decks_on_game_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.string   "name"
    t.integer  "num_players"
    t.string   "state",       default: "NOT_STARTED"
    t.integer  "turn"
    t.integer  "player_turn"
    t.integer  "start_count", default: 0
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "hand_cards", force: :cascade do |t|
    t.integer  "player_id"
    t.integer  "card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "hand_cards", ["card_id"], name: "index_hand_cards_on_card_id", using: :btree
  add_index "hand_cards", ["player_id"], name: "index_hand_cards_on_player_id", using: :btree

  create_table "merchants", force: :cascade do |t|
    t.integer  "player_id"
    t.integer  "board_id"
    t.integer  "card_id"
    t.integer  "leader"
    t.integer  "lead_cannons"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "merchants", ["board_id"], name: "index_merchants_on_board_id", using: :btree
  add_index "merchants", ["card_id"], name: "index_merchants_on_card_id", using: :btree
  add_index "merchants", ["player_id"], name: "index_merchants_on_player_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "chat_room_id"
    t.boolean  "private",      default: false
    t.integer  "target_id",    default: 0
    t.string   "body",                         null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "messages", ["chat_room_id"], name: "index_messages_on_chat_room_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.string   "body",       null: false
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "notifications", ["game_id"], name: "index_notifications_on_game_id", using: :btree

  create_table "pirates", force: :cascade do |t|
    t.integer  "player_id"
    t.integer  "board_id"
    t.integer  "merchant_id"
    t.integer  "card_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "pirates", ["board_id"], name: "index_pirates_on_board_id", using: :btree
  add_index "pirates", ["card_id"], name: "index_pirates_on_card_id", using: :btree
  add_index "pirates", ["merchant_id"], name: "index_pirates_on_merchant_id", using: :btree
  add_index "pirates", ["player_id"], name: "index_pirates_on_player_id", using: :btree

  create_table "players", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "user_id"
    t.integer  "score",          default: 0
    t.integer  "captured_ships", default: 0
    t.boolean  "winner"
    t.boolean  "ready",          default: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.boolean  "valid_moves",    default: true
  end

  add_index "players", ["game_id"], name: "index_players_on_game_id", using: :btree
  add_index "players", ["user_id"], name: "index_players_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "password_digest", null: false
    t.integer  "current_game"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "boards", "games"
  add_foreign_key "deck_cards", "cards"
  add_foreign_key "deck_cards", "decks"
  add_foreign_key "decks", "games"
  add_foreign_key "hand_cards", "cards"
  add_foreign_key "hand_cards", "players"
  add_foreign_key "merchants", "boards"
  add_foreign_key "merchants", "cards"
  add_foreign_key "merchants", "players"
  add_foreign_key "messages", "chat_rooms"
  add_foreign_key "messages", "users"
  add_foreign_key "notifications", "games"
  add_foreign_key "pirates", "boards"
  add_foreign_key "pirates", "cards"
  add_foreign_key "pirates", "merchants"
  add_foreign_key "pirates", "players"
  add_foreign_key "players", "games"
  add_foreign_key "players", "users"
end
