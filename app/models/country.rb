class Country < ActiveRecord::Base
	has_many :updates
	has_many :disasters
end
