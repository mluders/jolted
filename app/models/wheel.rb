class Wheel < ApplicationRecord
  include ActionView::Helpers::DateHelper

  MIN_SEGMENTS = 12

  belongs_to :shop
  has_many :wheel_segments, dependent: :destroy
  accepts_nested_attributes_for :wheel_segments

  has_many :discount_codes, dependent: :destroy
  has_many :raw_discount_codes, dependent: :destroy

  validate :min_segments
  validates_associated :wheel_segments
  validate :discount_duration_exists

  def random_segment_index
    weights = self.wheel_segments.map(&:gravity)
    weights = weights.each_with_index.map do |weight, i|
      Array.new(weight) { i }
    end.flatten.sample
  end

  def prize_description
    if use_dynamic_discount_codes?
      "This discount code will expire in #{time_ago_in_words(discount_duration.minutes.from_now)}."
    else
      ''
    end
  end

  private

  def min_segments
    errors.add(:wheel_segments, "must exist (at least #{MIN_SEGMENTS}") if wheel_segments.size < MIN_SEGMENTS
  end

  def discount_duration_exists
    return unless use_dynamic_discount_codes?

    errors.add(:discount_duration, "can't be blank") if discount_duration.blank?
  end
end
