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

ActiveRecord::Schema.define(version: 20140618001920) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "countries", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "disasters", force: true do |t|
    t.integer  "country_id"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "disasters", ["country_id"], name: "index_disasters_on_country_id", using: :btree

  create_table "organizations", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "type"
    t.string   "website"
    t.text     "about"
    t.string   "picture"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "organizations", ["user_id"], name: "index_organizations_on_user_id", using: :btree

  create_table "updates", force: true do |t|
    t.string   "headline"
    t.string   "date"
    t.string   "source"
    t.integer  "country_id"
    t.integer  "organization_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "updates", ["country_id"], name: "index_updates_on_country_id", using: :btree
  add_index "updates", ["organization_id"], name: "index_updates_on_organization_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
