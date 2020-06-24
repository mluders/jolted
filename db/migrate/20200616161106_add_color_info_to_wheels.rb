class AddColorInfoToWheels < ActiveRecord::Migration[6.0]
  def change
    add_column :wheels, :popup_background_color, :string, null: false, default: '#ffffff'
    add_column :wheels, :popup_font_color, :string, null: false, default: '#000000'
    add_column :wheels, :popup_accent_color, :string, null: false, default: '#007bff'
    add_column :wheels, :wheel_base_color, :string, null: false, default: '#ff7675'

    add_column :wheels, :colorize_wheel, :boolean, null: false, default: false
  end
end
