class DisastersController < ApplicationController
  respond_to :json, :html, :csv

  def index
  	@countries = Disaster.get_all_countries
  	@country_disasters = Disaster.get_all_disasters
  end

  def aids
  	@aids = File.read("public/assets/javascript/geodata/hiv-1995.json")
  	render json: @aids
  end

  def disasters
  	@disasters = File.read("public/assets/javascript/geodata/country-geo.json")
  	render json: @disasters
  end

  def show
  end
end
