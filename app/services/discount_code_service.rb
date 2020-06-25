class DiscountCodeService
  class MissingDurationError < StandardError; end

  def self.active_discount_code?(wheel:, email:)
    discount_code = DiscountCode.find_by(wheel: wheel, email: email)

    return false if discount_code.blank?
    return false if discount_code.expired?

    true
  end

  def self.create_discount_code(wheel_segment:, email:)
    wheel = wheel_segment.wheel
    raise MissingDurationError if wheel.discount_duration.blank?

    random_string = generate_random_string(length: 8)
    shopify_price_rule, shopify_discount_code = ShopifyAPIService.new(shop: wheel.shop).create_discount_code(
      code: random_string,
      duration_minutes: wheel.discount_duration
    )

    DiscountCode.create!(
      wheel: wheel,
      email: email,
      code: shopify_discount_code.code,
      expires_at: shopify_price_rule.ends_at,
      shopify_price_rule_id: shopify_price_rule.id,
      shopify_discount_code_id: shopify_discount_code.id
    )
  end

  private

  def self.generate_random_string(length:)
    SecureRandom.hex.gsub(/./){|s| s.send(%i[upcase downcase].sample)}[0...length]
  end
end