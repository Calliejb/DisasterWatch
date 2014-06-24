require 'httparty'
require 'open-uri'
require 'nokogiri'

class Disaster < ActiveRecord::Base
  
  include HTTParty

  belongs_to :country

	def self.get_all_countries
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=40")
		
		# Takes the json data for countries and pulls the string that gives the specific country
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[0]
		end
	end

	def self.get_all_disasters
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=40")
		
		# Takes the json data for disasters and pulls the string that gives the specific disaster data
		response["data"].map do |d|
			d["fields"]["name"].partition(":")[2]
		end
	end

	def self.get_all_descriptions
		response = HTTParty.get("http://api.rwlabs.org/v1/disasters?sort[]=date:desc&limit=40")
		response["data"].map do |d|
			id = d["id"]
			response_dis = HTTParty.get("http://api.rwlabs.org/v1/disasters/#{id}")
			response_dis["data"].map do |r|
				r["fields"]["description-html"]
			end
		end
	end

	def self.get_conflicts
		url = "http://en.wikipedia.org/wiki/List_of_ongoing_armed_conflicts"
		doc = Nokogiri::HTML(open(url))

		doc.css(".wikitable").css("tr").css("td").map do |d|
			d.text
		end
		# doc.css(".wikitable sortable jquery-tablesorter selectorgadget_selected").map do |country|
		# 	country.at_css(".selectorgadget_selected").text
		# 	# @price = shirt.at_css(".amt").text.split(".99").join
		# end

	end

end
