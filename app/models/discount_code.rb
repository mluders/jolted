class DiscountCode < ApplicationRecord
  belongs_to :wheel

  validates :email, presence: true
  validates :code, presence: true
  validates :expires_at, presence: true
  validates :shopify_price_rule_id, presence: true
  validates :shopify_discount_code_id, presence: true

  def active?
    self.expires_at >= DateTime.now.utc
  end
end
