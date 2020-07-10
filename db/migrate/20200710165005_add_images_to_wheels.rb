class AddImagesToWheels < ActiveRecord::Migration[6.0]
  def change
    add_column :wheels, :background_image_url, :string, null: true
    add_column :wheels, :small_logo_image_url, :string, null: true
  end
end
