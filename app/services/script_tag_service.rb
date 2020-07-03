class ScriptTagService
  class << self
    def setup_snippet_script_tag(shop:)
      host_url = Rails.application.config.host_url
      snippet_path = Rails.application.routes.url_helpers.proxy_shop_snippet_path(shop_id: shop.id)
      src = "#{host_url}#{snippet_path}"

      ShopifyAPIService.new(shop: shop).upsert_script_tag(src: src)
    end
  end
end