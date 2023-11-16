



// {with localstorge }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/aut-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isUserLogged: boolean=false;

  constructor(private authService: AuthService,private router: Router) {}

  login(): void {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Handle successful login, maybe redirect or update UI
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        // Handle error, show error message
        console.error('Login error:', error);
      });
      this.isUserLogged=this.authService.isUserLogged

  }

  logout(): void {
    this.authService.signOut()
    .then(() => {
      // Handle successful logout, maybe redirect or update UI
    })
    .catch(error => {
      // Handle error, show error message
      console.error('Logout error:', error);
      });

      this.isUserLogged=this.authService.isUserLogged
  }


  forgotPassword(): void {
    // Logic for handling forgot password functionality
  }

  ngOnInit(){
    this.isUserLogged=this.authService.isUserLogged
  }
}
