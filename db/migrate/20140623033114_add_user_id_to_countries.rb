class AddUserIdToCountries < ActiveRecord::Migration
  def change
    add_reference :countries, :user, index: true
  end
end
