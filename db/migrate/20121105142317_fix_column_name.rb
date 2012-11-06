class FixColumnName < ActiveRecord::Migration
  def self.up
    rename_column :trips, :range, :range_high
  end

end