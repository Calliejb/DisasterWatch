class CountriesController < ApplicationController
  def index
  	countries = Country.where(:user_id => current_user)

  	# Something like this
  	@personal_updates = countries.map do |c|
  		Update.get_feedzilla_country_ids_by_country(c)
  	end

    # @updates = Update.get_updates(params[:country_id])

    # countries = Country.find(params[:user_id]current_user)

    # @updates = Update.get_updates("country_id")
  end

  def show
  end
end
