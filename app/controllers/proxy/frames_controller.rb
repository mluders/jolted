module Proxy
  class FramesController < ApplicationController
    layout 'frame'

    def show
      Shop.find(params.require(:shop_id)) # Assert shop exists
    end
  end
end
