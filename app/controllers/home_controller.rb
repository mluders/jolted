# frozen_string_literal: true

class HomeController < AuthenticatedController
  def index
    ShopifyAPI::Shop.current # Dummy code to trigger a re-install if necessary

    @wheel = Wheel.find_by(shop: current_shop)
  end
end
