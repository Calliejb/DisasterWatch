class Organization < ActiveRecord::Base
  belongs_to :user
  has_many :updates

	def self.get_orgs1
		response = HTTParty.get("http://api.rwlabs.org/v1/sources?sort[]=name:asc&limit=1000")
		
		# Takes the json data for organizations and pulls the string that gives the name of the organization
		response["data"].map do |d|
			d["fields"]["name"]
		end
	end

	def self.get_orgs2
		response = HTTParty.get("http://api.rwlabs.org/v1/sources?offset=1000&sort[]=name:asc&limit=1000")
		
		response["data"].map do |d|
			d["fields"]["name"]
		end
	end

# Repeated three times because the ReliefWeb only allows 1000 calls at once
	def self.get_orgs3
		response = HTTParty.get("http://api.rwlabs.org/v1/sources?offset=2000&sort[]=name:asc&limit=1000")
		
		response["data"].map do |d|
			d["fields"]["name"]
		end
	end
end
