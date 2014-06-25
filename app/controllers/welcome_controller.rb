class WelcomeController < ApplicationController
  def index
  	@updates = Update.get_all_updates
  end
end