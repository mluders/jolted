module Proxy
  class WheelsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def show
      shop = Shop.find(params.require(:shop_id))
      wheel = shop.wheels.first

      return wheel_not_found unless wheel.present?

      wheel_response(wheel)
    end

    private

    def wheel_response(wheel)
      render json: {
        wheel: {
          id: wheel.id,
          segments: wheel.wheel_segments.as_json(only: [:label])
        }
      }
    end

    def wheel_not_found
      render json: { error: "This shop doesn't have a wheel" }, status: :not_found
    end
  end
end
