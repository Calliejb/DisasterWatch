class OrganizationsController < ApplicationController
  respond_to :json, :html

  def index
  	@organizations = Organization.all
  end

  def new
    @organization = Organization.new
  end

  def create

    @organization = Organization.new(organization_params)
    @organization.user = current_user

    # Saves terms and tweets that are collected for each organization term
    if @organization.save
      respond_to do |format|
        format.html {redirect_to organizationes_path(organization_id: @organization.id)}
        format.json do 
          render json: { @organiztions }, status: :created
        end
      end
    else
      respond_to do |format|
        format.html {render 'new'}
        format.json {render json: @organization.errors, status: :unprocessable_entity}
      end
    end


  end

  def show
    @organization = Organization.find(params[:id])
    respond_to do |format|
      format.html {render 'show'}
      format.json do 
        get_tweets(@organization)
        render json: { terms: @organization.terms.map(&:text), tweets1: @tweets, tweets2: @tweets2 }
      end
    end
  end

  private

    def organization_params
		params.require(:organization).permit(:name, :type, :website, :about, :picture)
	end

end
