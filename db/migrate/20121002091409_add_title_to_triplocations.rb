class AddTitleToTriplocations < ActiveRecord::Migration
   def change
	add_column :triplocation, :title, :string
  end
end
