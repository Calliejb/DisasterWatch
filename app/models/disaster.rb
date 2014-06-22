require 'httparty'

class Disaster < ActiveRecord::Base
  
  include HTTParty

  belongs_to :country

	def self.get_all_disasters
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=30")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[2]
		end
	end

	def self.get_all_countries
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=30")
		
		# Takes the json data for countries and pulls the string that gives the specific country
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[0]
		end
	end

end
