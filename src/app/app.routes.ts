import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './pages/store/store.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { AdminAddCategoriesComponent } from './pages/admin-add-categories/admin-add-categories.component';
import { AdminAddProductComponent } from './pages/admin-add-product/admin-add-product.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { authGuard } from './auth.guard';

// layout
import { ClientComponent as ClientLayout } from './layout/client/client.component';

export const routes: Routes = [
	{
		path:'',
		component:ClientLayout, 
		data: { requiresAdmin: false },
		children: [{
			path: '',
			component: StoreComponent,
		},
		{
			path:'product/:_id',
			component: DetailComponent,
		},
		{
			path:'cart',
			component:CartComponent,
		},
		{
			path:'checkout',
			component:CheckoutComponent,
		},
		{
			path:'login',
			component:LoginComponent,
		},
		{
			path:'signup',
			component:SignupComponent,
		},]	
	},
	{
		path:"admin",
		component :AdminComponent,
		canActivate : [authGuard],
		data: { requiresAdmin: true },
		children: [{
			path: "",
			component :AdminProductComponent
		},
		{
			path: "addProduct",
			component: AdminAddProductComponent
		},
		{
			path: "categories",
			component: AdminCategoriesComponent
		},
		{
			path : "addCategory",
			component: AdminAddCategoriesComponent
		}
	]
	}
	
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

