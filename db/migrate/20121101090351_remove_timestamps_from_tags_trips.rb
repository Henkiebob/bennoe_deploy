class RemoveTimestampsFromTagsTrips < ActiveRecord::Migration
  def up
  	drop_table :tags_trips
  	 create_table :tags_trips do |t|
      t.integer :trip_id
      t.integer :tag_id
    end
  end

  def down
  	
  end
end
