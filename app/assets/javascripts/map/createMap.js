//The mayListen variable is set to false by default. When the user hits the button to tag on the map
// The maylisten will become true, thus making the click listen and add markers
var mayListen = false;

//An array which holds the numbers
var markers = Array();

//A var to hold the map instance
var map;

//An array that holds the marker objects
var markerObjects = Array();


jQuery(document).ready(function() {
	getLocation();
	var arr = [];
	jQuery('#submitMarkers').click( function() {
		jQuery('#inputFields').find('.singleField').each(function () {
			//Find the ID of the parent(Its unique and auto increment)
			var markerFieldId = jQuery(this).parent().attr('id');
			
			//Split it to remove the 'markerfield-' text
			var splitId = markerFieldId.split('-');
			
			//Save the number
			var stepNumber = splitId[1];
			//Push the needed information in an array
			arr.push({
					
					'latlng': jQuery(this).parent().find('#latlngField').val(),
					'title': jQuery(this).val(),
					'description': jQuery(this).parent().find('#descriptionField').val()
			});
			
			data = {'triplocations_attributes': arr };
			
			console.log(data);
		});
		
		
		//Send the request to save_markers page
		jQuery.ajax({
			url: "/trips/save_markers",
			type: "POST",
			data: {markers:  data },
			success: function(resp){
				jQuery('#creationBlock').css('display', 'none');
				jQuery('#detailsBlock').html(resp);
				jQuery('#detailsBlock').css('display', 'block');
			}
		});
		
		
		return false;
	});
	
});

function markerListener(marker) {
	//Create a clicklistener for the marker to open a window
	google.maps.event.addListener(marker, 'click', function(event) {
		var inputField = document.getElementById(this.id);
		var infowindow = new google.maps.InfoWindow();
		
		//Put the inputValue of the marker into the popupwindow
		infowindow.setContent(inputField.value);
		infowindow.setPosition(this.position);

		infowindow.open(map);
	});
}

function saveCurrentLocation(position) {
	var currentLat = (position == undefined) ? "52.362183" : position.coords.latitude;
	var currentLon = (position == undefined) ? "4.875183" : position.coords.longitude;
	setMap(currentLat, currentLon);
}

function failedCurrentLocation(position) {
	setMap("52.362183", "4.875183");
}

function setMap(lat, lng) {
	if (map == undefined) {
		//Set map options
		var latlng = new google.maps.LatLng(lat, lng);
		var mapOptions = {
			center: latlng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		//Instantiate map
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		initialize();
	}
}


function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(saveCurrentLocation, failedCurrentLocation);
	} else {
		  alert("Sorry, uw browser ondersteund geen locatieherkenning.");
	}
}


function initialize() {
	jQuery("#markerToggler").click( function() {
		mayListen = (mayListen == false) ? true : false;
		if (mayListen == true) {
			jQuery(this).html('Stop met locaties plaatsen');
		} else {
			jQuery(this).html('Start met locaties plaatsen');
		}
	});

	google.maps.event.addListener(map, 'click', function(event) {
		/********** NIEUW *************/
		
		/************ /NIEUW &*******/
		if (mayListen == true) {
			var latLong = event.latLng+'';
			latLong = latLong.substr(1, latLong.length-2);
			
			//Substring the ( and ) from the coordinates and push 'm into the array used to set the lines
			markers.push(event.latLng);
			
			//Create a marker and give it a id(used later on to identify the correct inputfield)
			var mrkr = new google.maps.Marker({
				position: event.latLng,
				map: map,
				clickable: true,
				id: 'marker-' + markers.length
			});
			
			//Push the marker object into an array(Handy for later use, such as delete)
			markerObjects.push(mrkr);
			
			//Copy the predefined form and change the title attribute(onkeypress) and fill in the latitude/longitude from this click
			//Find the div
			var toCopy = jQuery('#toCopy');
			
			//FInd the latlng field in the found div
			var hiddenInput = toCopy.find('#latlngField');
			//Change its value to the current latlng
			hiddenInput.val(latLong);
			
			//Find the titlefield in the found div
			var titlesInput = toCopy.find('#titleField');
			//Add a onkeypress
			titlesInput.attr('onKeyPress', 'changeValue(\'markerFields-' + markers.length + '\');');
			titlesInput.addClass('singleField')
			//Append the transformed copied div to the form
			jQuery("#inputFields").append('\
			<div id="markerFields-' + markers.length + '">\
				<h2>' + markers.length + '</h2>\
				' + toCopy.html() + ' \
			</div>');

			//Create the lines between te markers
			createLines(markers);
			
			//Create an eventlistener outside the DOM
			markerListener(markerObjects);
		}
	});
}



function add_fields (link, association, content) {
	var new_id = new Date().getTime();
	var regexp = new RegExp("new_" + association, "g")
	$(link).parent().before(content.replace(regexp, new_id));
}