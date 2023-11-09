import { Router } from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languages, notifications, userItem } from './header-dummy-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private Router: Router) { }

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

}
