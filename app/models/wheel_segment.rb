class WheelSegment < ApplicationRecord
  enum outcome: { winning: 'winning', losing: 'losing' }

  belongs_to :wheel

  default_scope { order(:position) }

  validates :outcome, inclusion: { in: WheelSegment.outcomes.keys }
end
