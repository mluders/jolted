module API
  class WheelsController < API::BaseController
    def edit
      current_shop = Shop.first # TODO: change me
      wheel = Wheel.find_by(shop: current_shop) || WheelService.new_wheel(shop: current_shop)
      render json: { wheel: wheel_as_json(wheel) } # TODO: render only necessary fields
    end

    def update
      wheel = Wheel.find_or_initialize_by(shop: Shop.first) # TODO: Get shop from API token
      wheel.assign_attributes(update_params)
  
      if wheel.save
        render json: { message: 'Wheel was saved successfully' }
      else
        render json: { wheel: wheel_as_json(wheel) }, status: :unprocessable_entity
      end
    end
  
    private
  
    def update_params
      params.require(:wheel).permit(wheel_segments_attributes: [:id, :label, :gravity, :position, :outcome])
    end

    def wheel_as_json(wheel)
      wheel.as_json(include: { wheel_segments: { methods: :errors }}, methods: :errors)
    end
  end
end