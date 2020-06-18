module Proxy
  class SnippetsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:show]

    def show
      shop = Shop.find(params.require(:shop_id)) # Assert shop exists
      @wheel = Wheel.find_by!(shop: shop)
    end
  end
end
