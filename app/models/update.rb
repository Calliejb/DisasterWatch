require 'httparty'

class Update < ActiveRecord::Base
  
  include HTTParty

  belongs_to :country
  belongs_to :organization


	def self.get_updates
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=30")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[2]
		end
	end

	def self.get_all_countries
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=30")
		
		# Takes the json data for disasters and pulls the string that gives the specific country
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[0]
		end
	end
end
