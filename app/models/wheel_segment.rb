class WheelSegment < ApplicationRecord
  enum outcome: { winning: 'winning', losing: 'losing' }

  belongs_to :wheel, touch: true

  default_scope { order(:position) }

  validates :label, presence: true
  validates :outcome, inclusion: { in: WheelSegment.outcomes.keys }
  validate :discount_percent_exists
  validate :raw_discount_code_exists

  private

  def discount_percent_exists
    return if losing?
    return if wheel.blank?
    return unless wheel.use_dynamic_discount_codes?

    errors.add(:discount_percent, "can't be blank") if discount_percent.blank?
  end

  def raw_discount_code_exists
    return if losing?
    return if wheel.blank?
    return if wheel.use_dynamic_discount_codes?

    errors.add(:raw_discount_code, "can't be blank") if raw_discount_code.blank?
  end
end
