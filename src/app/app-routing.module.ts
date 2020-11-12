import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
	{ path:'', redirectTo: '/main', pathMatch: 'full' },
	{ path: 'main', component: MainComponent},
	{ path: 'order/:id', component: OrderComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
