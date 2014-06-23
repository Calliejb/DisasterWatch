require 'httparty'

class Update < ActiveRecord::Base
  
  include HTTParty

  belongs_to :country
  belongs_to :organization


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

	def self.get_updates(country_id)
		country_id ||= "830"

		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/#{country_id}/articles.json?count=20&order=date")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
	end

	# def self.get_rweb_updates
	# 	response = HTTParty.get("http://api.rwlabs.org/v1/countries?limit=200")

	# 	# Takes the json data for disasters and pulls the string that gives the specific disaster data
	# 	response["data"].map do |d|
	# 		d["fields"]["name"].partition(":")[2]
	# 	end
	# end

	# def self.get_rweb_org_updates
	# end
end
