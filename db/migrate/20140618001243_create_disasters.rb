class CreateDisasters < ActiveRecord::Migration
  def change
    create_table :disasters do |t|
      t.references :country, index: true
      t.string :description

      t.timestamps
    end
  end
end
