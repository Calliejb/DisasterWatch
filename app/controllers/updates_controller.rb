class UpdatesController < ApplicationController
  def index

  	@countries = Country.where(:user_id => current_user).limit(1)

    namesarray = @countries.map do |c|
      c.name
    end

    @names = namesarray[0]

    firstname = @names.partition(',')[0];
    secondstring = @names.partition(',')[2];

    secondname = secondstring.partition(',')[0];
    thirdstring = secondstring.partition(',')[2];

    


    @names.partition(",").map do |n|
      n
      @this = Update.compare(n)
    end
  	# @myupdates = Update.get_feedzilla_country_ids_by_country(@countries)
  	
  	@updates = Update.get_all_updates

  	@feedzillacountries = Update.get_feedzilla_countries
  	@feedzillacountryids = Update.get_feedzilla_country_ids
  end

  def show
  end
end
