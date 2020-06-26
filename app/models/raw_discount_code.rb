class RawDiscountCode < ApplicationRecord
  belongs_to :wheel

  validates :email, presence: true
  validates :code, presence: true
end
