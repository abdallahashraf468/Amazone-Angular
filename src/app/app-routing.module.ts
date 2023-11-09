import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ParentCComponent } from './Components/parent-c/parent-c.component';
import { ProductsComponent } from './Components/products/products.component';
// import { AboutComponent } from './Components/about/about.component';
// import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DetailsComponent } from './Components/details/details.component';
// import { CategoryComponent } from './Components/category/category.component';
// import { CatDetailsComponent } from './Components/cat-details/cat-details.component';
// import { UserAuthComponent } from './Components/user-auth/user-auth.component';
// import { userGuard } from './Guard/user.guard';
// import { ReactiveFormComponent } from './Components/Admin/reactive-form/reactive-form.component';
// import { UserTemplateDrivenFormComponent } from './Components/User/user-template-driven-form/user-template-driven-form.component';
// import { UserRactiveFormComponent } from './Components/User/user-ractive-form/user-ractive-form.component';
import { DashboardComponent } from './Components/final/dashboard/dashboard.component';
import { StatisticsComponent } from './Components/final/statistics/statistics.component';
import { CoupensComponent } from './Components/final/coupens/coupens.component';
import { SettingsComponent } from './Components/final/settings/settings.component';
import { MediaComponent } from './Components/final/media/media.component';
import { ProductUploadFormComponent } from './Components/product-upload-form/product-upload-form.component';

const routes: Routes = [
  // { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, title: "dashboard" },
  { path: 'statistics', component: StatisticsComponent, title: "statistics" },
  {
    path: 'coupens',
    loadChildren: () => import('./Components/final/coupens/coupens.module').then(m => m.CoupensModule),
  },
  { path: 'media', component: MediaComponent, title: "media" },
  { path: 'settings', component: SettingsComponent, title: "settings" },

  // { path: "home", component: ParentCComponent, title: "Home Page" },
  // { path: "products", component: ProductsComponent, title: "products Page" },
  {
    path: "products",
    loadChildren: () => import('./Components/products/products.module').then(m => m.ProductsModule),
  },
  {path : 'product-upload-form', component: ProductUploadFormComponent, title: "product-upload-form"},

  // { path: "parent", component: ParentCComponent, title: "products-parent Page", canActivate: [userGuard] },
  // { path: "category", component: CategoryComponent, title: "category Page", canActivate: [userGuard] },
  // { path: "about", component: AboutComponent, title: "About-Us Page" },
  // { path: "contact", component: ContactUsComponent, title: "Contact-Us Page" },
  { path: "details/:id", component: DetailsComponent, title: "details" },
  // { path: "catdetails/:id", component: CatDetailsComponent, title: "Category details" },
  // { path: "admin/insertproduct", component: ReactiveFormComponent, title: "Add product" },
  // { path: 'edit-product/:id', component: ReactiveFormComponent, title: "Edit product" },
  // { path: 'delete-product/:id', component: ReactiveFormComponent, title: "Delete product" },
  // { path: "userLogin", component: UserAuthComponent, title: "User Login" },
  // { path: "userLogout", component: UserAuthComponent, title: "User Logout" },
  // { path: "userTemplate", component: UserTemplateDrivenFormComponent, title: "User Template Form Page" },
  // { path: "userReactive", component: UserRactiveFormComponent, title: "User Reactive Form Page" },
  // { path: "users", loadChildren: () => import('./Components/users/users.module').then(m => m.UsersModule) },
  { path: "**", component: NotFoundComponent, title: "NotFound Page" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
