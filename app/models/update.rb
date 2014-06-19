class Update < ActiveRecord::Base
  belongs_to :country
  belongs_to :organization
end
