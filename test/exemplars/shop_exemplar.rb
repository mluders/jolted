class ShopExemplar
  def self.create!(params = {})
    Shop.create!(
      shopify_domain: params[:shopify_domain] || 'test-shop.myshopify.com',
      shopify_token: params[:shopify_token] || 'dummy-token'
    )
  end
end
