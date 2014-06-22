require 'httparty'

class Update < ActiveRecord::Base
  
  include HTTParty

  belongs_to :country
  belongs_to :organization


	def self.get_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/830/articles.json?count=10")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
	end

	def self.get_feedzilla_countries
		response = HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories.json")
		
		response["display_subcategory_name"].partition("- ")[2].map
	end

	def self.get_feedzilla_country_ids
		response = HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories.json")
		
		response["subcategory_id"].map
	end
end
