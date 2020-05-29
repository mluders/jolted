class CreateDiscountCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :discount_codes, id: :uuid do |t|
      t.references :wheel, type: :uuid, null: false
      t.string :email, null: false
      t.string :code, null: false
      t.datetime :expires_at, null: false
      t.string :shopify_price_rule_id, null: false
      t.string :shopify_discount_code_id, null: false
      t.timestamps
    end

    add_index :discount_codes, [:wheel_id, :email]
  end
end
