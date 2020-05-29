module Proxy
  class WheelsController < ApplicationController
    def create
      email = params.require(:email)
      render json: { coupon_code: 'abc123' }, status: :created
    end
  end
end
