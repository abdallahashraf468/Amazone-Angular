import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './Components/header/header.component';
// import { ProductsComponent } from './Components/products/products.component';
// import { FooterComponent } from './Components/footer/footer.component';
import { SideMenuComponent } from './Components/final/side-menu/side-menu.component';
// import { NavigationBarComponent } from './Components/navigation-bar/navigation-bar.component';
import { FormsModule } from '@angular/forms';
// import { ProductCardDirective } from './Directives/product-card.directive';
// import { CreditCardPipe } from './Pipes/credit-card.pipe';
// import { ParentCComponent } from './Components/parent-c/parent-c.component';
// import { AboutComponent } from './Components/about/about.component';
// import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DetailsComponent } from './Components/details/details.component';
import { HttpClientModule } from '@angular/common/http';
// import { CategoryComponent } from './Components/category/category.component';
// import { CatDetailsComponent } from './Components/cat-details/cat-details.component';
// import { UserAuthComponent } from './Components/user-auth/user-auth.component';
// import { ReactiveFormComponent } from './Components/Admin/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { UserTemplateDrivenFormComponent } from './Components/User/user-template-driven-form/user-template-driven-form.component';
// import { UserRactiveFormComponent } from './Components/User/user-ractive-form/user-ractive-form.component';
import { DashboardComponent } from './Components/final/dashboard/dashboard.component';
import { StatisticsComponent } from './Components/final/statistics/statistics.component';
// import { SubproductsComponent } from './Components/final/subproducts/subproducts.component';
import { PagesComponent } from './Components/final/pages/pages.component';
import { MediaComponent } from './Components/final/media/media.component';
import { SettingsComponent } from './Components/final/settings/settings.component';
import { BodyComponent } from './Components/final/body/body.component';
import { SubmenuComponent } from './Components/final/side-menu/submenu.component';
import { HeaderComponent } from './Components/header/header.component';
import {OverlayModule } from '@angular/cdk/overlay';
import {CdkMenuModule } from '@angular/cdk/menu';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDDYcZV0eHYZ3lIQfZi--vZJgfYJeDaFx4",
  authDomain: "fir-88026.firebaseapp.com",
  projectId: "fir-88026",
  storageBucket: "fir-88026.appspot.com",
  messagingSenderId: "947539259472",
  appId: "1:947539259472:web:f1f9925e12528cdfe92155"
};

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // ProductsComponent,
    // FooterComponent,
    SideMenuComponent,
    // NavigationBarComponent,
    // ProductCardDirective,
    // CreditCardPipe,
    // ParentCComponent,
    // AboutComponent,
    // ContactUsComponent,
    NotFoundComponent,
    DetailsComponent,
    // CategoryComponent,
    // CatDetailsComponent,
    // UserAuthComponent,
    // ReactiveFormComponent,
    // UserTemplateDrivenFormComponent,
    // UserRactiveFormComponent,
    DashboardComponent,
    StatisticsComponent,
    // SubproductsComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    BodyComponent,
    SubmenuComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    OverlayModule,
    CdkMenuModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
