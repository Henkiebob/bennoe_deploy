class Triplocation < ActiveRecord::Base
  attr_accessible :latlng, :trip_id, :title, :description, :is_snapped
  belongs_to :trip, :dependent => :destroy
end
