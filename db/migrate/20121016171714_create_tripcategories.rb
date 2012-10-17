class CreateTripcategories < ActiveRecord::Migration
  def change
    create_table :tripcategories do |t|
      t.integer :category_id
      t.integer :trip_id

      t.timestamps
    end
  end
end
