$(document).ready(function() {			  
	// maakt json array zet daarin de data
	var data = {};

	// globals
	var categoryArray = [];
	var statesArray = [];
	var rangeLow  = [];
	var rangeHigh = [];

	// base data
	stateCheck();
	updateTotalRange(0, 15);  
	categoryCheck();

	// kijken naar checkboxes voer functie uit bij verandering.
	$('input[type="checkbox"]').change(function() {
		categoryCheck();
	});
	
	//kijken naar selectboxes voer functie uit bij verandering.
	$('.states').change(function() {
		stateCheck();
	  });

	function categoryCheck(){
	
		categoryArray = [];
		$(".category:checked").each(function() {
			categoryArray.push(this.value);	
		});
	
		// schrijft naar array
		//data.all_data.push({ category: categoryArray});
		collectAll();
	}

	function stateCheck(){
		statesArray = [];
		var state = $('.states').val();

		statesArray.push(state);
	
		// schrijft naar array
		collectAll();
	}

	function updateTotalRange(range_low, range_high){
	
		rangeLow  = [];
		rangeHigh = [];
	
		rangeLow.push(range_low);
		rangeHigh.push(range_high);
	
		// schrijft naar array
		collectAll();
	}

	function collectAll() {
		data = {'categories': categoryArray,
				'province': statesArray,
				'rangeLow': rangeLow,
				'rangeHigh': rangeHigh
		};
	}

	// slider aanzetten, range en options + listeners	 
	$(function() {
	    var valMap = [0, 15, 20, 30, 50, 100];
	    $("#slider-range").slider({
	    	min: 0,
	    	max: valMap.length - 1,
	    	values: [0, 1],
	    	slide: function(event, ui) {                        
	    		$("#amount").val('KM: ' + valMap[ui.values[0]] + ' - ' + valMap[ui.values[1]]);      
				
				updateTotalRange(valMap[ui.values[0]], valMap[ui.values[1]]);          
	    	}  
			     
	    });
	    $("#amount").val('KM: ' + valMap[$("#slider-range").slider("values", 0)] + ' - ' + valMap[$("#slider-range").slider("values", 1)]);
	});

	// versturen van data
	jQuery('#searchButton').click(function(){
	
		jQuery.ajax ({
				url: '/explore',
				type: 'GET',
				data: {'toSearch' : data },
				success: function (response) {
		
				if(response.length > 0 ) {
			
					for(var key in response){
						var content = '';
						if(response.hasOwnProperty(key)){
							content += '<li>Titel:' +response[key]['title']+ '</li>';	
						}			
					}
			
				}
				else {
					var content = 'No results found';
				}
				// zet in je mail
				jQuery('#results ul').html(content);
			}
		}); 
		return false;
	});

});
