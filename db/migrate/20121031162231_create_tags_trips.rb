class CreateTagsTrips < ActiveRecord::Migration
  def change
    create_table :tags_trips do |t|
      t.integer :trip_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
