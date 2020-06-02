module Proxy
  class DiscountCodesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      email = params.require(:email)
      wheel = Wheel.first
      segment_index = wheel.random_segment_index
      segment = wheel.wheel_segments[segment_index]
      discount_code = DiscountCodeService.create_discount_code(wheel_segment: segment, email: email)

      render json: { prize: discount_code.code, segment_index: segment_index }, status: :created
    end
  end
end
