class Wheel < ApplicationRecord
  MIN_SEGMENTS = 12

  belongs_to :shop
  has_many :wheel_segments, dependent: :destroy
  accepts_nested_attributes_for :wheel_segments

  validate :min_segments

  def random_segment_index
    weights = self.wheel_segments.map(&:gravity)
    weights = weights.each_with_index.map do |weight, i|
      Array.new(weight) { i }
    end.flatten.sample
  end

  private

  def min_segments
    errors.add(:wheel_segments, "must exist (at least #{MIN_SEGMENTS}") if wheel_segments.size < MIN_SEGMENTS
  end
end
