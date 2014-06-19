class Disaster < ActiveRecord::Base
  belongs_to :country

  	def self.party(movie)
		movie ||= "matrix"

		# q = movie
		# page_limit = 1
		disasters_url = "http://api.rwlabs.org/v1/disasters.json"
		
		response = HTTParty.get disasters_url

		@id = response["disasters"][0]["id"]
		# id = '770672122'
		disaster_url = "http://api.rwlabs.org/v1/disasters/#{id}.json"

		response = HTTParty.get disaster_url
		
	end
end
