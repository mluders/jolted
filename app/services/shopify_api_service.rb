class ShopifyAPIService
  APP_NAME = Rails.application.class.parent_name.downcase
  SHOPIFY_API_KEY = ShopifyApp.configuration.api_key
  SHOPIFY_SECRET = ShopifyApp.configuration.secret
  SHOPIFY_API_VERSION = ShopifyApp.configuration.api_version

  def initialize(shop:)
    ShopifyAPI::Session.setup(api_key: SHOPIFY_API_KEY, secret: SHOPIFY_SECRET)
    session = ::ShopifyAPI::Session.new(
      api_version: SHOPIFY_API_VERSION,
      domain: shop.shopify_domain,
      token: shop.shopify_token
    )
    ShopifyAPI::Base.activate_session(session)
  end

  def create_discount_code(code:, percent_off:, duration_minutes:)
    price_rule = ShopifyAPI::PriceRule.create(
      title: "#{APP_NAME}_#{code}",
      target_type: "line_item",
      target_selection: "all",
      allocation_method: "across",
      value_type: "percentage",
      value: "-#{percent_off.to_f}",
      customer_selection: "all",
      starts_at: Time.current.utc.iso8601,
      ends_at: (Time.current.utc + duration_minutes.minutes).iso8601,
      usage_limit: 1
    )

    discount_code = ShopifyAPI::DiscountCode.new
    discount_code.prefix_options[:price_rule_id] = price_rule.id
    discount_code.code = code
    discount_code.save

    [price_rule, discount_code]
  end

  def list_all_script_tags
    ShopifyAPI::ScriptTag.all
  end

  def upsert_script_tag(src:, event: 'onload')
    tag = ShopifyAPI::ScriptTag.where(src: src).first
    ShopifyAPI::ScriptTag.create!(src: src, event: event) if tag.blank?
  end
end