class CreateTriplocations < ActiveRecord::Migration
  def change
    create_table :triplocations do |t|
      t.string :latlng
      t.integer :trip_id

      t.timestamps
    end
  end
end
