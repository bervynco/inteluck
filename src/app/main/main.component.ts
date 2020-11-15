import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
	map: mapboxgl.Map;
	orderList:any;
	// orderList:any=[{
	// 	'order_id': "INT-28123",
	// 	"order_description": "This is a sample order",
	// 	"order_origin_address": "Tondo, Manila",
	// 	"order_destination_address": "Taguig, Philippines",
	// 	"delivery_status": "For delivery"
	// },{
	// 	'order_id': "INT-28124",
	// 	"order_description": "This is a sample order",
	// 	"order_origin_address": "Taguig, Philippines",
	// 	"order_destination_address": "Pasig, Philippines",
	// 	"delivery_status": "Order initiated"
	// },{
	// 	'order_id': "INT-28125",
	// 	"order_description": "This is a sample order",
	// 	"order_origin_address": "Caloocan, Philippines",
	// 	"order_destination_address": "Malabon, Philippines",
	// 	"delivery_status": "Completed"
	// }];
	constructor(private router: Router, private dataService:DataService) { }

	latitude = 0;
	longitude = 0;
	ngOnInit() {
		this.getOrderList();
	}

	getOrderList() {
		this.dataService.getOrderList().subscribe(
			(res:any) => {
				console.log(res);
				this.orderList = res[0];
			},
			(error)=> {
				console.log(error);
			}
		)
	}

	navigateToOrderDetails(orderId){
		console.log(orderId);
		this.router.navigateByUrl('/order/' + orderId);
	}
	createNewOrder() {
		this.router.navigateByUrl('/order/0');
	}

}
