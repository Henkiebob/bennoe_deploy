class Trip < ActiveRecord::Base
  attr_accessible :description, :title, :user_id, 
  :triplocations_attributes, :photo, :category_ids, 
  :start_city, :tripphotos_attributes, :img_url, :thumb_url, :images,
  :tags_attributes, :province

  # validates :title, :length => {:minimum => 3}
  # validates :description, :presence => true
  # validates_associated :tags


  has_many :triplocations, :dependent => :destroy
  has_many :tripphotos, :dependent => :destroy
 
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :tags

 
  accepts_nested_attributes_for :triplocations, allow_destroy: true
  accepts_nested_attributes_for :tripphotos, allow_destroy: true
  accepts_nested_attributes_for :categories
  accepts_nested_attributes_for :tags



end
