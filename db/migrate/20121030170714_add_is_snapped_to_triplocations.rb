class AddIsSnappedToTriplocations < ActiveRecord::Migration
  def change
    add_column :triplocations, :is_snapped, :integer
  end
end
