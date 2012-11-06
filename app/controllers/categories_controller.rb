class CategoriesController < ApplicationController
	def create
		@category = Category.new
	end
  
  def new 
    @category = Category.new(params[:category])
  end

	def show
		@tripsByCat = Category.find(params[:id]).trips
	end
end
