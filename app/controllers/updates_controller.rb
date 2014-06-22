class UpdatesController < ApplicationController
  def index
  	@updates = Update.get_updates

  	@feedzillacountries = Update.get_feedzilla_countries
  end

  def show
  end
end
