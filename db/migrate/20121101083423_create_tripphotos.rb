class CreateTripphotos < ActiveRecord::Migration
  def change
    create_table :tripphotos do |t|
      t.string :filename
      t.integer :trip_id

      t.timestamps
    end
  end
end
