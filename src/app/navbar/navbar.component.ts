import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
