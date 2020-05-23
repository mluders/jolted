class WheelService
  def self.new_wheel(shop:)
    wheel = Wheel.new(shop: shop)
    Wheel::MIN_SEGMENTS.times { wheel.wheel_segments.build(label: 'hello') }
    wheel
  end
end
