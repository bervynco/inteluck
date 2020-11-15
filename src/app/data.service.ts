import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { throwError, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	BASE_PATH:String = "http://localhost:3333/";
  	constructor(private http: HttpClient) { }

	getOrderList() {
		return  this.http.get(this.BASE_PATH + 'getOrderList');
	}

	getDeliveryStatus() {

	}
  	addOrder(orderDetails) {
		return  this.http.post(this.BASE_PATH + 'addOrder', orderDetails
		);
	}

	updateOrder(orderDetails) {
		return  this.http.post(this.BASE_PATH + 'updateOrder', orderDetails
		);
	}

	deleteOrder(orderId){
		return  this.http.post(this.BASE_PATH + 'updateOrder', {
			"order_id": orderId
		});
	}
}
