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

  def show_africa
    @africanews = Update.get_africa_updates
  end

  def show_asia
    @asianews = Update.get_asia_updates
  end

  def show_middle_east
    @middleeastnews = Update.get_middle_east_updates
  end

  def show_north_america
    @northamericanews = Update.get_north_america_updates
  end

  def show_central_america
    @centralamericanews = Update.get_central_america_updates
  end

  def show_south_america
    @southamericanews = Update.get_south_america_updates
  end

  def show_oceania
    @oceanianews = Update.get_oceania_updates
  end

  def show_europe
    @europenews = Update.get_europe_updates
  end

end
