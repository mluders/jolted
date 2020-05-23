class CreateWheelSlices < ActiveRecord::Migration[6.0]
  def change
    create_table :wheel_slices, id: :uuid do |t|
      t.references :wheel, type: :uuid, null: false
      t.string :label, null: true
      t.timestamps
    end
  end
end
