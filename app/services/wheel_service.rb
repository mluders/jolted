class WheelService
  def self.new_wheel(shop:)
    wheel = Wheel.new(shop: shop)

    Wheel::MIN_SEGMENTS.times do
      wheel.wheel_segments.build(
        label: 'hello',
        gravity: 10
      )
    end

    wheel
  end
end
