function drawMap(locations) {
	if(locations) {
		var markers = [];
		for (var i in locations) {
			loc = locations[i].split(', ');
			//Create a marker and give it a id(used later on to identify the correct inputfield)
			var markerPos = new google.maps.LatLng(loc[0], loc[1]);
			var mrkr = new google.maps.Marker({
				position: markerPos,
				map: map,
				clickable: true
			});
			
			markers.push(markerPos);
		}
		createLines(markers);
	}
}