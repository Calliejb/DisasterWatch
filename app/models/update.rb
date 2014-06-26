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



	def self.get_feedzilla_country_ids_by_country(country)
		# Bring in country from controller
		# if country matches feedzilla country return that subcategory_id
		# use .map so it returns multiple
		response = HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories.json")
		
		response.map do |r|
			name = r["display_subcategory_name"].partition("- ")[2]
			country_id = r["subcategory_id"]
			if country == name
				HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/#{country_id}/articles.json?count=2&order=date")
			end
		end

		# country.map do |c|
		# 	c.name
		# end
		# response.map do |r|
		# 	subcategory = r["display_subcategory_name"].partition("- ")[2]

		# 	subcategory.map do |s|
		# 		r + "--" + country
		# end

		# country.each do |c|
			# response.each do |r|
			# 	feedzilla_country = r["display_subcategory_name"].partition("- ")[2]
				
			# 	if country == feedzilla_country
			# 		country_id = r["subcategory_id"]
			# 		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/#{country_id}/articles.json?count=1&order=date")
			# 	else
			# 		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/850/articles.json?count=1&order=date")
			# 	end
			# end
		# end
	end

	def self.get_all_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/articles.json?count=50&order=date")
	end
	

	def self.get_updates(country_id)
		country_id ||= "830"

		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/#{country_id}/articles.json?count=20&order=date")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
	end

	def self.get_africa_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/828/articles.json?count=25&order=date")
	end

	def self.get_asia_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/885/articles.json?count=25&order=date")
	end

	def self.get_middle_east_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/976/articles.json?count=25&order=date")
	end

	def self.get_north_america_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/1015/articles.json?count=25&order=date")
	end

	def self.get_central_america_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/990/articles.json?count=25&order=date")
	end

	def self.get_south_america_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/975/articles.json?count=25&order=date")
	end

	def self.get_oceania_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/908/articles.json?count=25&order=date")
	end

	def self.get_europe_updates
		HTTParty.get("http://api.feedzilla.com/v1/categories/19/subcategories/941/articles.json?count=25&order=date")
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
