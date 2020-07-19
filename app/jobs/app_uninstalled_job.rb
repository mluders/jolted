class AppUninstalledJob < ApplicationJob
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)
    shop&.destroy
  end
end
