module API
  class WheelsController < API::BaseController
    def edit
      wheel = Wheel.find_by(shop: current_shop) || WheelService.new_wheel(shop: current_shop)
      render json: { wheel: wheel_as_json(wheel) } # TODO: render only necessary fields
    end

    def update
      wheel = Wheel.find_or_initialize_by(shop: current_shop)
      wheel.assign_attributes(update_params)
  
      if wheel.save
        ScriptTagService.setup_snippet_script_tag(shop: current_shop) # TODO: Find a better spot for this
        render json: { message: 'Wheel was saved successfully' }
      else
        render json: { wheel: wheel_as_json(wheel) }, status: :unprocessable_entity
      end
    end
  
    private
  
    def update_params
      params.require(:wheel).permit(
        :live,
        :popup_background_color,
        :popup_font_color,
        :popup_accent_color,
        :wheel_base_color,
        :colorize_wheel,
        :use_dynamic_discount_codes,
        :discount_duration,
        wheel_segments_attributes: [
          :id,
          :label,
          :gravity,
          :position,
          :outcome,
          :discount_percent,
          :raw_discount_code
        ]
      )
    end

    def wheel_as_json(wheel)
      wheel.as_json(include: { wheel_segments: { methods: :errors }}, methods: :errors)
    end
  end
end
