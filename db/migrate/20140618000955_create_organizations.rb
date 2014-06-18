class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.references :user, index: true
      t.string :name
      t.string :type
      t.string :website
      t.text :about
      t.string :picture

      t.timestamps
    end
  end
end
