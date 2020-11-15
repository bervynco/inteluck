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
	constructor(private router: Router, private dataService:DataService) { }

	latitude = 0;
	longitude = 0;
	ngOnInit() {
		this.getOrderList();
	}

	getOrderList() {
		this.dataService.getOrderList().subscribe(
			(res:any) => {
				this.orderList = res;
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
