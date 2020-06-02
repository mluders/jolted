module Proxy
  class SnippetsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:show]

    def show
      Shop.find(params.require(:shop_id)) # Assert shop exists
    end
  end
end
