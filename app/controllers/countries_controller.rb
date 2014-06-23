class CountriesController < ApplicationController
  def index
  	countries = Country.where(:user_id => current_user)
  	
  	# Something like this
  	countries.each do |c|
  		@personal_updates = Update.where(:country => c)
  	end
  end

  def show
  end
end
