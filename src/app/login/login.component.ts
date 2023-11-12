import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthenServiceService } from 'src/app/Services/user-authen-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {





  user:boolean = true

  constructor( private UserAuthenService:UserAuthenServiceService ,private Router:Router){}

  ngOnInit(): void {
    this.user = this.UserAuthenService.isUserLoggedInOrNot;
    console.log(this.user)
  }



  loginFun(){
    this.UserAuthenService.userLogin("abdullah@gmail.com" , "123")
    if(this.user = this.UserAuthenService.isUserLoggedInOrNot){
    this.Router.navigate(['/dashboard']);

    }


  }
  logOut(){
    this.UserAuthenService.userLogout()
    this.user = this.UserAuthenService.isUserLoggedInOrNot;


  }


}
