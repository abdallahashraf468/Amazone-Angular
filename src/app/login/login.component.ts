import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthenServiceService } from 'src/app/Services/user-authen-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {





  user:boolean = true

  constructor( private UserAuthenService:UserAuthenServiceService ,private Router:Router ,private Toster:ToastrService){

    Router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.user = this.UserAuthenService.isUserLoggedInOrNot;

        if (this.user && val.url === '/login') {
          this.Router.navigate(['/dashboard']);
        } else if (!this.user && val.url !== '/login') {
        }
      }
    });
  }

  ngOnInit(): void {
    this.user = this.UserAuthenService.isUserLoggedInOrNot;
    console.log(this.user)
  }



  loginFun(){
    this.UserAuthenService.userLogin("abdullah@gmail.com" , "123")
    if(this.user = this.UserAuthenService.isUserLoggedInOrNot){
    this.Toster.success("Success", "Login Success")
    this.Router.navigate(['/dashboard']);

    }


  }





}
