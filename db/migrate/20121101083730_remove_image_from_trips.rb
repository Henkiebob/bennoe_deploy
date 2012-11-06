class RemoveImageFromTrips < ActiveRecord::Migration
  def up
  		remove_column :trips, :image
  end

  def down
  end
end
