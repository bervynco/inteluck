import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environment';
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
	latitude = 0;
	longitude = 0;
	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	ngOnInit() {
		// this.setupMap();
	}
	constructor() { }
	setCurrentLocation() {
		navigator.geolocation.getCurrentPosition(function(position) {
			var locationMarker = null;
			if (locationMarker){
			  // return if there is a locationMarker bug
			  return;
			}
			console.log(position.coords);
			// sets default position to your position
			this.latitude = position.coords["latitude"];
			this.longitude = position.coords["longitude"];
			
			
			},
			function(error) {
				console.log("Error: ", error);
			},
			{
				enableHighAccuracy: true
			}
		);
	}
	setupMap() {
		this.setCurrentLocation();
      	this.map = new mapboxgl.Map({
			accessToken: environment.mapbox.accessToken,
			container: 'map',
			style: this.style,
			zoom: 13,
			center: [this.latitude, this.longitude]
		});
		// Add map controls
		this.map.addControl(new mapboxgl.NavigationControl());
	}
}
