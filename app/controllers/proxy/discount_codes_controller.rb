module Proxy
  class DiscountCodesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      # shop = Shop.find(params.require(:shop_id))
      # wheel = shop.wheels.first
      # email = params.require(:email)

      # return active_discount_code_error if DiscountCodeService.active_discount_code?(wheel: wheel, email: email)

      # segment_index = wheel.random_segment_index
      # segment = wheel.wheel_segments[segment_index]
      # discount_code = DiscountCodeService.create_discount_code(wheel_segment: segment, email: email)

      # render json: { prize: discount_code.code, segment_index: segment_index }, status: :created
      render json: { prize: '1234', segment_index: 5 }, status: :created

    end

    private

    def active_discount_code_error
      render json: { message: 'Active discount code already exists' }, status: :unprocessable_entity
    end
  end
end
