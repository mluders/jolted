class DiscountCode < ApplicationRecord
  belongs_to :wheel

  def expired?
    self.expires_at < DateTime.now.utc
  end
end
