class CreateRawDiscountCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :raw_discount_codes, id: :uuid do |t|
      t.references :wheel, type: :uuid, null: false
      t.string :email, null: false
      t.string :code, null: false
      t.timestamps
    end

    add_index :discount_codes, [:wheel_id, :email]
  end
end
