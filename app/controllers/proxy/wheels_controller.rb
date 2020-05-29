module Proxy
  class WheelsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def show
      shop = Shop.find(params.require(:shop_id))
      wheel = shop.active_wheel

      return render json: { error: "This shop doesn't have a wheel" }, status: :not_found

      render json: { wheel: wheel }
    end
  end
end
