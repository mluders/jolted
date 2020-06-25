class AddDiscountInfoToWheelSegments < ActiveRecord::Migration[6.0]
  def change
    add_column :wheels, :use_dynamic_discount_codes, :boolean, null: false, default: false
    add_column :wheels, :discount_duration, :integer, null: true
    add_column :wheel_segments, :discount_percent, :integer, null: true
    add_column :wheel_segments, :raw_discount_code, :string, null: true
  end
end
