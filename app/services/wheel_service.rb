class WheelService
  LOSING_LABELS = [
    'No luck today',
    'Almost',
    'Nothing',
    'Sorry!',
    'Nope',
    'Next time'
  ]

  class << self
    def new_wheel(shop:)
      wheel = Wheel.new(shop: shop)

      Wheel::MIN_SEGMENTS.times do |i|
        winning_segment = winning_index?(i)

        wheel.wheel_segments.build(
          label: default_label(i),
          gravity: winning_segment ? 10 : 0,
          position: i,
          outcome: winning_segment ? 'winning' : 'losing'
        )
      end

      wheel
    end

    def winning_index?(i)
      i.even?
    end

    def default_label(i)
      winning_index?(i) ? nil : LOSING_LABELS[i / 2 % LOSING_LABELS.size]
    end
  end
end
