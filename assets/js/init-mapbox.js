$(document).ready(function() {
	console.log('init-mapbox.js ready!');
	
	const list = $('#list').html('');

	mapboxgl.accessToken = 'pk.eyJ1IjoiamVucy1zY2huaXR6bGVyIiwiYSI6ImNsaWxoZWp2NjA4cjEza3BucjZqZWg3ZnUifQ.vH7p2W-dXz7my73sTlXXkA';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/jens-schnitzler/clilhgokh00hn01pf8giwczds',
		center: [-24, 42], // starting position [lng, lat]
		zoom: 1, // starting zoom
		interactive: false, // Disable user interactivity
		renderWorldCopies: true,
	});

	/* --- Center the map on a clicked feature --- */

	map.on('load', () => {
		
		const geojson = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						name: 'New York'
					},
					geometry: {
						type: 'Point',
						coordinates: [-74.006, 40.7128] // New York coordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						name: 'Hong Kong'
					},
					geometry: {
						type: 'Point',
						coordinates: [114.1694, 22.3193] // Hong Kong coordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						name: 'Berlin'
					},
					geometry: {
						type: 'Point',
						coordinates: [13.404954, 52.520008] // Berlin coordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						name: 'Paris'
					},
					geometry: {
						type: 'Point',
						coordinates: [2.3522, 48.8566] // Paris coordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						name: 'Plovdiv'
					},
					geometry: {
						type: 'Point',
						coordinates: [24.7536, 42.1354] // Plovdiv coordinates
					}
				}
			]
		};
		
		// fly to
		function flyTo(coordinates){
			// Fly to the clicked location
			map.flyTo({
				center: coordinates,
				zoom: 2,
				//speed: 1.2
			});
		}
		
		// Loop through the GeoJSON features to create markers and click events
		geojson.features.forEach(function(feature) {
			var coordinates = feature.geometry.coordinates;
			var name = feature.properties.name;
			
			// create a HTML element for each feature
			const el = document.createElement('div');
			el.className = 'marker';
		
			// Create a marker for each location and add to the map
			var marker = new mapboxgl.Marker(el)
				.setLngLat(coordinates)
				.addTo(map);
		
			// Bind click event to the marker
			marker.getElement().addEventListener('click', function() {
				flyTo(coordinates)
			});
			
			// --- add list item
			var newListItem = $('<a data-id="">' + name + '</a>');
			list.append(newListItem);
			
			newListItem[0].addEventListener('click', function() {
				flyTo(coordinates)
			});
		});
		
	});

});