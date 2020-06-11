module API
  class WheelsController < API::BaseController
    def update
      @wheel = Wheel.find_or_initialize_by(shop: Shop.first) # TODO: Get shop from API token
      @wheel.assign_attributes(update_params)
  
      if @wheel.save
        flash.now[:success] = "Your wheel has been updated"
        redirect_to root_path
      else
        flash.now[:error] = @wheel.errors.full_messages.to_sentence
        render :edit
      end
    end
  
    private
  
    def update_params
      params.require(:wheel).permit(wheel_segments_attributes: [:id, :label, :gravity, :position, :outcome])
    end
  end
end
