class AddLiveInfoToWheels < ActiveRecord::Migration[6.0]
  def change
    add_column :wheels, :live, :boolean, null: false, default: false
  end
end
