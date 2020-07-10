module Proxy
  class DiscountCodesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      shop = Shop.find(params.require(:shop_id))
      wheel = shop.wheels.first
      email = params.require(:email)
      is_preview = params.require(:is_preview)

      return active_discount_code_error if is_preview == false && DiscountCodeService.active_discount_code?(wheel: wheel, email: email)

      segment_index = wheel.random_segment_index
      segment = wheel.wheel_segments[segment_index]
      discount_code = begin
        if is_preview
          wheel.use_dynamic_discount_codes? ? 'EXAMPLE_CODE' : segment.raw_discount_code
        elsif wheel.use_dynamic_discount_codes?
          DiscountCodeService.create_dynamic_discount_code(wheel_segment: segment, email: email).code
        else
          DiscountCodeService.create_raw_discount_code(wheel_segment: segment, email: email).code
        end
      end

      render json: {
        prize_label: segment.label,
        prize_description: wheel.prize_description,
        prize_value: discount_code,
        segment_index: segment_index
      }, status: :created
    end

    private

    def active_discount_code_error
      render json: { message: 'This person already has an active discount code.' }, status: :unprocessable_entity
    end
  end
end
