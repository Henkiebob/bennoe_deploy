class AddColumnToTriplocations < ActiveRecord::Migration
  def change
    add_column :triplocations, :description, :text
  end
end
