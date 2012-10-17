class Trip < ActiveRecord::Base
  attr_accessible :description, :title, :user_id, :triplocations_attributes, :photo, :category_ids
  has_many :triplocations, :dependent => :destroy
 
  has_and_belongs_to_many :categories
 
  accepts_nested_attributes_for :triplocations, allow_destroy: true
  accepts_nested_attributes_for :categories
end
