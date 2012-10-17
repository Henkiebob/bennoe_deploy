class AddTitleToTriplocation < ActiveRecord::Migration
  def change
    add_column :triplocations, :title, :string
  end
end
