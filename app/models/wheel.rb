class Wheel < ApplicationRecord
  MIN_SLICES = 10

  belongs_to :shop
  has_many :wheel_slices
  accepts_nested_attributes_for :wheel_slices

  validate :min_slices

  private

  def min_slices
    errors.add(:wheel_slices, "must exist (at least #{MIN_SLICES}") if wheel_slices.size < MIN_SLICES
  end
end
