# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_25_144449) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "discount_codes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "wheel_id", null: false
    t.string "email", null: false
    t.string "code", null: false
    t.datetime "expires_at", null: false
    t.string "shopify_price_rule_id", null: false
    t.string "shopify_discount_code_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["wheel_id", "email"], name: "index_discount_codes_on_wheel_id_and_email"
    t.index ["wheel_id"], name: "index_discount_codes_on_wheel_id"
  end

  create_table "shops", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  create_table "wheel_segments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "wheel_id", null: false
    t.integer "position", null: false
    t.string "outcome", null: false
    t.string "label", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "gravity", null: false
    t.integer "discount_percent"
    t.string "raw_discount_code"
    t.index ["wheel_id"], name: "index_wheel_segments_on_wheel_id"
  end

  create_table "wheels", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "shop_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "use_dynamic_discount_codes", default: false, null: false
    t.integer "discount_duration"
    t.string "popup_background_color", default: "#ffffff", null: false
    t.string "popup_font_color", default: "#000000", null: false
    t.string "popup_accent_color", default: "#007bff", null: false
    t.string "wheel_base_color", default: "#ff7675", null: false
    t.boolean "colorize_wheel", default: false, null: false
    t.boolean "live", default: false, null: false
    t.index ["shop_id"], name: "index_wheels_on_shop_id"
  end

end
