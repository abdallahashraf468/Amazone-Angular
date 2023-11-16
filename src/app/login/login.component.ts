// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { UserAuthenServiceService } from 'src/app/Services/user-authen-service.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {





//   user:boolean = true

//   constructor( private UserAuthenService:UserAuthenServiceService ,private Router:Router){}

//   ngOnInit(): void {
//     this.user = this.UserAuthenService.isUserLoggedInOrNot;
//     console.log(this.user)
//   }



//   loginFun(){
//     this.UserAuthenService.userLogin("abdullah@gmail.com" , "123")
//     if(this.user = this.UserAuthenService.isUserLoggedInOrNot){
//     this.Router.navigate(['/dashboard']);

//     }


//   }
//   logOut(){
//     this.UserAuthenService.userLogout()
//     this.user = this.UserAuthenService.isUserLoggedInOrNot;


//   }


// }

// import { Component } from '@angular/core';
// import { AuthService } from '../Services/aut-service.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService) {}

//   login(): void {
//     this.authService.SignIn(this.email, this.password);
//   }

//   forgotPassword(): void {
//     // Add logic for handling forgot password functionality
// -----------------------------------------------------------------------1
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private afAuth: AngularFireAuth) { }

//   async signInWithEmailAndPassword(email: string, password: string) {
//     try {
//       const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
//       // Login successful, you can access userCredential.user for the user details if needed
//       console.log('Login successful', userCredential.user);

//       // Store admin details in local storage
//       localStorage.setItem('admin', JSON.stringify(userCredential.user));

//       // Redirect to the desired route or perform any other action upon successful login
//     } catch (error) {
//       // An error occurred during login
//       console.error('Error during sign-in:', error);
//       // Handle the error appropriately, such as displaying an error message to the user
//       throw error; // Ensure the error is propagated for better error handling in the component
//     }
//   }
// }

// ----------------------------------------------------------------2


// {connect with collection admin}

import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/aut-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isUserLogged: boolean=false;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(){
    this.isUserLogged=this.authService.isUserLogged
  }

  login(): void {
    this.authService.SignIn(this.email, this.password)
      .then(() => {
        // Redirect to dashboard after successful login
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert('Invalid username or password'); // Handle authentication errors
      });
      this.isUserLogged=this.authService.isUserLogged

  }
  logout(): void {
    this.authService.SignOut();
    this.isUserLogged=this.authService.isUserLogged

  }

  forgotPassword(): void {
    // Logic for handling forgot password functionality
  }
}





// {with localstorge }


// import { Component } from '@angular/core';
// import { AuthService } from '../Services/aut-service.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService,private router: Router) {}

//   login(): void {
//     this.authService.signInWithEmailAndPassword(this.email, this.password)
//       .then(() => {
//         // Handle successful login, maybe redirect or update UI
//         this.router.navigate(['dashboard']);
//       })
//       .catch(error => {
//         // Handle error, show error message
//         console.error('Login error:', error);
//       });
//   }

//   logout(): void {
//     this.authService.signOut()
//       .then(() => {
//         // Handle successful logout, maybe redirect or update UI
//       })
//       .catch(error => {
//         // Handle error, show error message
//         console.error('Logout error:', error);
//       });
//   }
// }
