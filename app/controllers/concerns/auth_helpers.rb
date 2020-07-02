module AuthHelpers
  extend ActiveSupport::Concern

  def current_shop
    Shop.find(session[:shop_id])
  end
end
