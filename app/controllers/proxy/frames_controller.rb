module Proxy
  class FramesController < ApplicationController
    layout 'frame'

    def show
      @wheel = Wheel.find_by!(shop_id: params.require(:shop_id))
    end
  end
end
