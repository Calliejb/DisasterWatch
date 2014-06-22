class OrganizationsController < ApplicationController
  respond_to :json, :html

  def index
  	@organizations = Organization.all
  	respond_with @organizations
  end

  def new
    @organization = Organization.new
  end

  def create

    @organization = Organization.new(organization_params)
    @organization.user = current_user


    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'The new organization was successfully created.' }
        format.json { render action: 'show', status: :created, location: @organization }
      else
        format.html { render action: 'new' }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end


  end

  def show
    @organization = Organization.find(params[:id])
  end

  private

    def organization_params
		params.require(:organization).permit(:name, :type, :website, :about, :picture)
	end

end
