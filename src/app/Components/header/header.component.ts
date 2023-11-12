import { Router } from '@angular/router';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { languages, notifications, userItem } from './header-dummy-data';
import { FirebasePrdService } from 'src/app/Services/fire-base-prd.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { Dialog2Component } from './dialog2/dialog2.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuTrigger')  menuTrigger!: MatMenuTrigger;
  constructor( private Router: Router,  private productService:FirebasePrdService, public dialog: MatDialog ) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(Dialog2Component, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage : any;

  languages = languages;
  notifications = notifications;
  userItem = userItem;


  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'head-trimmed';
    }else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-m-screen';
    }
    return styleClass;
  }
  goToForm(){
    this.Router.navigate(['/product-upload-form']);
  }

  checkCanShowSearchAsOverlay(innerWidth: number):void{
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;
    }else {
      this.canShowSearchAsOverlay = false;
    }
  }

  set listFilter (value: string){
    this.productService.PerformSearch(value);
    this.productService.filterProducts(value);
  }

}
