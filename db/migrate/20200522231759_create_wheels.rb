class CreateWheels < ActiveRecord::Migration[6.0]
  def change
    create_table :wheels, id: :uuid do |t|
      t.references :shop, type: :uuid, null: false
      t.timestamps
    end
  end
end
