class AddStartCityToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :start_city, :string
  end
end
