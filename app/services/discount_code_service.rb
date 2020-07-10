class DiscountCodeService
  class MissingDurationError < StandardError; end
  class MissingRawDiscountError < StandardError; end

  class << self
    def active_discount_code?(wheel:, email:)
      raw_discount = RawDiscountCode.find_by(wheel: wheel, email: email)
      return true if raw_discount&.active?
  
      dynamic_discount = DiscountCode.find_by(wheel: wheel, email: email)
      return true if dynamic_discount&.present?

      false
    end

    def create_dynamic_discount_code(wheel_segment:, email:)
      wheel = wheel_segment.wheel
      discount_duration = wheel.discount_duration

      raise MissingDurationError if discount_duration.blank?

      random_string = generate_random_string(length: 8)
      shopify_price_rule, shopify_discount_code = ShopifyAPIService.new(shop: wheel.shop).create_discount_code(
        code: random_string,
        percent_off: wheel_segment.discount_percent,
        duration_minutes: discount_duration,
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

    def create_raw_discount_code(wheel_segment:, email:)
      raise MissingRawDiscountError if wheel_segment.raw_discount_code.blank?

      RawDiscountCode.create!(
        wheel: wheel_segment.wheel,
        email: email,
        code: wheel_segment.raw_discount_code
      )
    end

    private

    def generate_random_string(length:)
      SecureRandom.hex.gsub(/./){|s| s.send(%i[upcase].sample)}[0...length]
    end
  end
end