class DisastersController < ApplicationController
  respond_to :json, :html

  def index
  	@countries = Disaster.get_all_countries
  	@country_disasters = Disaster.get_all_disasters
  end

  def countrymap
  	@countrymap = File.read("public/assets/javascript/geodata/country-geo.json")
  	render json: @countrymap
  end

  def countries
  	@countries = Disaster.get_all_countries
  	render json: @countries
  end

  def countrydisasters
  	@country_disasters = Disaster.get_all_disasters
  	render json: @country_disasters
  end

  def show
  end
end
