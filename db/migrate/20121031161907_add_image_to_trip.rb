class AddImageToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :image, :string
  end
end
