require 'httparty'

class Country < ActiveRecord::Base
	include HTTParty

	has_many :updates
	has_many :disasters


end
