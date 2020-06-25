module Proxy
  class DiscountCodesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      shop = Shop.find(params.require(:shop_id))
      wheel = shop.wheels.first
      email = params.require(:email)

      return active_discount_code_error if DiscountCodeService.active_discount_code?(wheel: wheel, email: email)

      segment_index = wheel.random_segment_index
      segment = wheel.wheel_segments[segment_index]
      discount_code = begin
        if wheel.use_dynamic_discount_codes?
          DiscountCodeService.create_discount_code(wheel_segment: segment, email: email).code
        else
          segment.raw_discount_code
        end
      end

      render json: { prize: discount_code, segment_index: segment_index }, status: :created
    end

    private

    def active_discount_code_error
      render json: { message: 'This person already has an active discount code.' }, status: :unprocessable_entity
    end
  end
end
