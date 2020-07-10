class RawDiscountCode < ApplicationRecord
  belongs_to :wheel

  validates :email, presence: true
  validates :code, presence: true

  def active?
    DateTime.now.utc - self.created_at < 3.days
  end
end
