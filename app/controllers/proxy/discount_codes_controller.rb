module Proxy
  class DiscountCodesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      email = params.require(:email)
      wheel = Wheel.first
      slice_index = wheel.random_slice_index
      slice = wheel.wheel_slices[slice_index]
      discount_code = DiscountCodeService.create_discount_code(wheel_slice: slice, email: email)

      render json: { prize: discount_code, slice_index: slice_index }, status: :created
    end
  end
end
