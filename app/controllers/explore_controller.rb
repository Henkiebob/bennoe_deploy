class ExploreController < ApplicationController
  respond_to :json, :html
  
  def index
     @trips = Trip.scoped
     
    if(params.has_key?(:toSearch))

      @trips = @trips.where(:category_id => params[:toSearch][:categories])if params[:toSearch][:categories].present?
      
      #check to see if there is a province
      @trips = @trips.where("province = ?",
          params[:toSearch][:province] 
      )if params[:toSearch][:province].present?
      
      # check if there is range between high and low   
      @trips = @trips.where("range_high <= ? AND range_low >= ?", 
          params[:toSearch][:rangeHigh],
          params[:toSearch][:rangeLow] 
      )if params[:toSearch][:rangeHigh].present?
        
      #@trips = Trip.where("range_high = ? AND range_low = ? AND category_id = * AND province = ?
      #{}", 
        #params[:toSearch][:rangeHigh],
        #params[:toSearch][:rangeLow],
        #params[:toSearch][:categories],
        #params[:toSearch][:province]
      #)
      
     # @trips = Trip.where(category_id: params[:toSearch][:categories], province: params[:toSearch][:province] )
     # "name like ?", "%#{params[:query]}%"
      
      respond_with @trips
    
    else       
       respond_to do |format|
           format.html { render html: @trips }
       end  
    end
    
  end
    
end
