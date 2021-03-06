class CountriesController < ApplicationController
  def index
  	@countries = Country.where(:user_id => current_user).limit(1)
    
    # @ups = @countries.map do |c|
    #   Update.compare(c.name)
    # end

    @myupdates = Update.get_feedzilla_country_ids_by_country("Benin")
    # @countries = Country.all
  	# Something like this

  	# @personal_updates = @countries.map do |c|
  	# 	Update.get_feedzilla_country_ids_by_country(c)
  	# end

    # @updates = Update.get_updates(params[:country_id])

    # countries = Country.find(params[:user_id]current_user)

    # @updates = Update.get_updates("country_id")
  end

  def show
  end

  def new
    @country = Country.new
    respond_to do |format|
      format.html
      format.json { render json: @country}
    end
  end

  def create
    @country = Country.new(country_params)
    @country.user = current_user
    respond_to do |format|
      if @country.save
        format.html { redirect_to @country, notice: "Save process completed!" }
        format.json { render json: @country, status: :created, location: @country }
      else
        format.html { 
          flash.now[:notice]="Save proccess coudn't be completed!" 
          render :new 
        }
        format.json { render json: @country.errors, status: :unprocessable_entity}
      end
    end
  end

  private

  def country_params
    params.require(:country).permit(:name, :user_id)
  end

end

