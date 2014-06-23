class UpdatesController < ApplicationController
  def index
  	@updates = Update.get_all_updates

  	@feedzillacountries = Update.get_feedzilla_countries
  	@feedzillacountryids = Update.get_feedzilla_country_ids
  end

  def show
  end
end
