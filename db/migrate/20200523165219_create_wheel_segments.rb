class CreateWheelSegments < ActiveRecord::Migration[6.0]
  def change
    create_table :wheel_segments, id: :uuid do |t|
      t.references :wheel, type: :uuid, null: false
      t.integer :position, null: false
      t.string :outcome, null: false
      t.string :label, null: false
      t.timestamps
    end
  end
end
