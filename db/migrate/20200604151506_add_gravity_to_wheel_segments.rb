class AddGravityToWheelSegments < ActiveRecord::Migration[6.0]
  def change
    add_column :wheel_segments, :gravity, :integer, null: false
  end
end
