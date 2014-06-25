class UpdatesController < ApplicationController
  def index

  	@countries = Country.where(:user_id => current_user)
  	@myupdates = Update.get_feedzilla_country_ids_by_country("Benin")
  	
  	@updates = Update.get_all_updates

  	@feedzillacountries = Update.get_feedzilla_countries
  	@feedzillacountryids = Update.get_feedzilla_country_ids
  end

  def show
  end
end
