class TripsController < ApplicationController
  def index
    @trips = Trip.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @trips }
    end
  end
  def show
    @trip = Trip.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @trip }
    end
  end

  def new
    @trip = Trip.new
	 1.times { triploc = @trip.triplocations.build }
  end

  def edit
    @trip = Trip.find(params[:id])
  end

  def create
    
    @trip = Trip.new(params[:trip])

  	respond_to do |format|
  	  if @trip.save
  		format.html { redirect_to @trip, notice: 'Trips was successfully created.' }
  		format.json { render json: @trip, status: :created, location: @trip }
  	  else
  		format.html { render action: "new" }
  		format.json { render json: @trip.errors, status: :unprocessable_entity }
  	  end
  	end
  end

  def update
    @trip = Trip.find(params[:id])

    respond_to do |format|
      if @trip.update_attributes(params[:trip])
        format.html { redirect_to @trip, notice: 'Trip was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @trip = Trip.find(params[:id])
    @trip.destroy

    respond_to do |format|
      format.html { redirect_to trips_url }
      format.json { head :no_content }
    end
  end
  
  def save_markers
    @trip = Trip.create(params[:markers])
    1.times { tags = @trip.tags.build }
    5.times { tripphotos = @trip.tripphotos.build }
    @categories = Category.all
  end
  
end
