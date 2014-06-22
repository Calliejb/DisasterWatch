class UpdatesController < ApplicationController
  def index
  	@updates = Update.get_updates
  end

  def show
  end
end
