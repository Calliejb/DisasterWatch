class UpdatesController < ApplicationController
  def index
  	@updates = Update.get_updates("850")

  	@feedzillacountries = Update.get_feedzilla_countries
  	@feedzillacountryids = Update.get_feedzilla_country_ids
  end

  def show
  end
end
