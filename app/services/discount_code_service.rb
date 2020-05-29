class DiscountCodeService
  def self.create_discount_code(wheel_segment:, email:)
    wheel = wheel_segment.wheel

    discount_code = DiscountCode.find_or_initialize_by(wheel: wheel, email: email)
    return discount_code if discount_code.persisted?

    random_string = generate_random_string(length: 8)
    shopify_price_rule, shopify_discount_code = ShopifyApiService.new(shop: wheel.shop).create_discount_code(code: random_string)

    discount_code.update!(
      wheel: wheel,
      email: email,
      code: shopify_discount_code.code,
      expires_at: shopify_price_rule.ends_at,
      shopify_price_rule_id: shopify_price_rule.id,
      shopify_discount_code_id: shopify_discount_code.id
    )

    discount_code
  end

  private

  def self.generate_random_string(length:)
    SecureRandom.hex.gsub(/./){|s| s.send(%i[upcase downcase].sample)}[0...length]
  end
end