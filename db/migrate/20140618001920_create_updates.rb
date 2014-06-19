class CreateUpdates < ActiveRecord::Migration
  def change
    create_table :updates do |t|
      t.string :headline
      t.string :date
      t.string :source
      t.references :country, index: true
      t.references :organization, index: true

      t.timestamps
    end
  end
end
