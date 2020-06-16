class AddColorInfoToWheels < ActiveRecord::Migration[6.0]
  def change
    add_column :wheels, :popup_background_color, :string, null: false, default: '#ffffff'
    add_column :wheels, :popup_font_color, :string, null: false, default: '#000000'
    add_column :wheels, :popup_accent_color, :string, null: false, default: '#007bff'
  end
end
