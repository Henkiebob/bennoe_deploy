var walkingPath;
function createLines(markers) {
	if (walkingPath) {
		//If a walkingPath already exists, empty it out
		walkingPath.setPath([]);
	}
	
	//Put all markers into a path
	walkingPath = new google.maps.Polyline({
		path: markers,
		strokeColor: "#000000",
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	
	walkingPath.setMap(map);
}

function changeValue(id) {
	var inputField = jQuery('#'+id).find('#titleField');
	jQuery(inputField).val(jQuery(inputField).val());
}

function deleteLastWaypoint() {
	if (markerObjects) {
		//Delete and pop the last marker in the array
		markerObjects[markerObjects.length-1].setMap(null);
		markerObjects.pop();
		
		//Delete the inputFields
		jQuery('#markerFields-' + markers.length).remove();
		
		//Pop the backup array used to create the lines
		markers.pop();
	}
	
	//Create new lines on the map
	createLines(markers);
}



