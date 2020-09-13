require 'test_helper'

class WheelServiceTest < ActiveSupport::TestCase
  test 'generates valid wheel' do
    shop = ShopExemplar.create!
    wheel = WheelService.new_wheel(shop: shop)

    refute wheel.persisted?
    assert_equal shop, wheel.shop
    assert_equal Wheel::MIN_SEGMENTS, wheel.wheel_segments.length

    wheel.wheel_segments.each_with_index do |segment, i|
      if i.even?
        assert_nil segment.label
        assert_equal 10, segment.gravity
        assert_equal i, segment.position
        assert_equal 'winning', segment.outcome

        refute segment.valid?
        expected_errors = { label: ["can't be blank"], raw_discount_code: ["can't be blank"] }
        assert_equal expected_errors, segment.errors.messages
      else
        assert_equal losing_label(i), segment.label
        assert_equal 0, segment.gravity
        assert_equal i, segment.position
        assert_equal 'losing', segment.outcome
        assert segment.valid?
      end
    end
  end

  private

  def losing_label(index)
    WheelService::LOSING_LABELS[(index / 2) % WheelService::LOSING_LABELS.size]
  end
end
