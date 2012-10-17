class CreateCategoriesTrips < ActiveRecord::Migration
  def change
    create_table :categories_trips do |t|
      t.integer :category_id
      t.string :trip_id

    end
  end
end
