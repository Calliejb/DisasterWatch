class UpdatesController < ApplicationController
  def index

  	countries = Country.where(:user_id => current_user).last(10)

    @myupdates = countries.map do |c|
      Update.get_feedzilla_country_ids_by_country(c.name)
    end

    # @myupdates = Update.get_feedzilla_country_ids_by_country("Benin")
  	
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
