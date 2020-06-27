module Proxy
  class SnippetsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:show]

    def show
      shop = Shop.find(params.require(:shop_id)) # Assert shop exists
      @wheel = Wheel.find_by!(shop: shop)
    rescue ActiveRecord::RecordNotFound
      head :ok # TODO: Maybe there's a better way to do this
    end
  end
end
