class AddFeedzillaidToCountries < ActiveRecord::Migration
  def change
    add_column :countries, :feedzillaid, :string
  end
end
