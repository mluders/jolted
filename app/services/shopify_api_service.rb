class ShopifyApiService
  APP_NAME = Rails.application.class.parent_name.downcase
  SHOPIFY_API_KEY = Rails.application.credentials.shopify[:api_key]
  SHOPIFY_API_SECRET = Rails.application.credentials.shopify[:api_secret]
  SHOPIFY_API_VERSION = Rails.application.config.shopify[:api_version]

  def initialize(shop:)
    ::ShopifyAPI::Session.setup(api_key: SHOPIFY_API_KEY, secret: SHOPIFY_API_SECRET)
    session = ::ShopifyAPI::Session.new(
      api_version: SHOPIFY_API_VERSION,
      domain: shop.shopify_domain,
      token: shop.shopify_token
    )
    ShopifyAPI::Base.activate_session(session)
  end

  def create_discount_code(code:)
    price_rule = ShopifyAPI::PriceRule.create(
      title: "#{APP_NAME}_#{code}",
      target_type: "line_item",
      target_selection: "all",
      allocation_method: "across",
      value_type: "percentage",
      value: "-20.0",
      customer_selection: "all",
      starts_at: Time.current.utc.iso8601,
      ends_at: (Time.current.utc + 24.hours).iso8601,
      usage_limit: 1
    )

    discount_code = ShopifyAPI::DiscountCode.new
    discount_code.prefix_options[:price_rule_id] = price_rule.id
    discount_code.code = code
    discount_code.save

    [price_rule, discount_code]
  end
end