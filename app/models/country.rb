require 'httparty'

class Country < ActiveRecord::Base
	include HTTParty

	has_many :updates
	has_many :disasters

	def self.get_feedzilla_countries
		response = HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories.json")
		
		response.map do |r|
			r["display_subcategory_name"].partition("- ")[2]
		end
	end

	def self.get_feedzilla_country_ids
		response = HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories.json")
		
		response.map do |r|
			r["subcategory_id"]
		end
	end

end
