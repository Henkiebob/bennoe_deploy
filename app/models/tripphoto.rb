class Tripphoto < ActiveRecord::Base
  attr_accessible :filename, :trip_id
  belongs_to :trip

    mount_uploader :filename, TripphotoUploader
end
