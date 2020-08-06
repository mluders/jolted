class AfterAuthenticateJob < ApplicationJob
  def perform(shop_domain:)
    shop = Shop.find_by(shopify_domain: shop_domain)
    ScriptTagService.setup_snippet_script_tag(shop: shop)
  end
end
