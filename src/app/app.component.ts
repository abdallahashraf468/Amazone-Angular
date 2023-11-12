import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Amazon';

  showHeader = true;

  constructor(private  router:Router){
    router.events.subscribe(
      (val) => {
        if(val instanceof NavigationEnd){
          if(val.url == '/login'){
            this.showHeader=false
          }else{
            this.showHeader=true
          }
        }
      }
    )
  }


  isSidenav = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenav = data.collapsed;
  }
}
