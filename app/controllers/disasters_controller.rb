class DisastersController < ApplicationController
  def index
  	@countries = Disaster.get_all_countries
  	@disasters = Disaster.get_all_disasters
  end

  def show
  end
end
