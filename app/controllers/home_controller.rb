# frozen_string_literal: true

class HomeController < AuthenticatedController
  def index
    @wheel = Wheel.find_by(shop: current_shop)
  end
end
