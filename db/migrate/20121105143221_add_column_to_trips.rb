class AddColumnToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :range_low, :integer
  end
end
