class AddHiddenFieldsToWheelSegments < ActiveRecord::Migration[6.0]
  def change
    add_column :wheel_segments, :position, :integer, null: false
    add_column :wheel_segments, :outcome, :string, null: false
  end
end
