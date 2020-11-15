import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environment';
import { Router, ActivatedRoute  } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup,  FormBuilder,  Validators, FormControl, FormArray } from '@angular/forms';

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
	orderDetails:any = null;
	style = 'mapbox://styles/mapbox/streets-v11';
	orderForm: FormGroup;
	forCreateFlag:Boolean;
	ngOnInit() {
		this.setupMap();
		this.activeRoute.paramMap.subscribe(params => {
			let orderId = params.get("id");
			console.log(orderId);
			if(orderId !== "0") {
				this.forCreateFlag = false;
				console.log("Initialize Page");
				this.initializePage(orderId);
			}
			else {
				this.forCreateFlag = true;
				this.getNewId();
			}
		});
		
		
	}
	constructor(private router: Router, private dataService:DataService, private activeRoute:ActivatedRoute, private formBuilder:FormBuilder) {
		this.setupForm();
	}
	setupForm() {
		this.orderForm = this.formBuilder.group({
			order_id: new FormControl("", [
				Validators.required
			]),
			order_description: new FormControl("", [
				Validators.required
			]),
			order_origin_address: new FormControl("", [
				Validators.required
			]),
			order_destination_address: new FormControl("", [
				Validators.required
			])

		});
	}
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

	backToOrderList() {
		this.router.navigateByUrl('/main');
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

	patchFormValue(orderDetails) {
		this.orderForm.patchValue({
			'order_id': orderDetails.order_id,
			'order_origin_address': orderDetails.order_origin_address,
			'order_destination_address': orderDetails.order_destination_address,
			'order_description': orderDetails.order_description
		});
	}

	deleteOrder(orderId) {
		this.dataService.deleteOrder(orderId).subscribe(
			(res:any)=> {
				this.router.navigateByUrl('/main');
			},
			(error)=> {

			}
		)
	}
	initializePage(orderId) {
		this.dataService.getOrderDetails(orderId).subscribe(
			(res:any)=> {
				this.orderDetails = res[0];
				this.patchFormValue(this.orderDetails);
				console.log(this.orderDetails);
			},
			(error) => {}

		)
	}
	getNewId() {
		this.dataService.getNewOrderId().subscribe(
			(res:any)=> {
				this.orderForm.patchValue({
					'order_id': res.order_id
				});
			},
			(error) => {}

		)
	}

	createOrder() {
		let postDetails = this.orderForm.value;
		console.log(postDetails);
		this.dataService.addOrder(postDetails).subscribe(
			(res:any)=> {
				console.log(res);
				this.router.navigateByUrl('/main');
			},
			(error)=> {

			}
		)
	}

	updateOrder() {
		let postDetails = this.orderForm.value;
		console.log(postDetails);
		this.dataService.updateOrder(postDetails).subscribe(
			(res:any)=> {
				console.log(res);
				this.router.navigateByUrl('/main');
			},
			(error)=> {

			}
		)
	}
}
