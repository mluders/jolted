class Wheel < ApplicationRecord
  MIN_SEGMENTS = 10

  belongs_to :shop
  has_many :wheel_segments, dependent: :destroy
  accepts_nested_attributes_for :wheel_segments

  validate :min_segments

  def random_segment_index
    rand(0...MIN_SEGMENTS)
  end

  private

  def min_segments
    errors.add(:wheel_segments, "must exist (at least #{MIN_SEGMENTS}") if wheel_segments.size < MIN_SEGMENTS
  end
end
