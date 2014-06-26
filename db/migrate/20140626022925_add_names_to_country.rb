class AddNamesToCountry < ActiveRecord::Migration
  def change
    add_column :countries, :names, :text
  end
end
