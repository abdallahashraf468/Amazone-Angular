// {connect with collection admin}


import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 isUserLoggedSubject: BehaviorSubject<boolean>;
  constructor(private router: Router) {

this.isUserLoggedSubject = new BehaviorSubject<boolean>(false);
  }

  async SignIn (email: string, password: string): Promise<void> {
    const auth = getAuth(); // Initialize Firebase auth
    const db = getFirestore(); // Initialize Firestore

    try {
      const adminRef = collection(db, 'admin');
      const adminQuery = query(adminRef, where('email', '==', email));

      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const adminData: DocumentData = adminSnapshot.docs[0].data();
        const adminPassword = adminData['password'];

        await signInWithEmailAndPassword(auth, email, password);

        // Store user data in local storage upon successful login
        const userData = { email: email, /* other relevant user data */ };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.isUserLoggedSubject.next(true);
      } else {
        throw new Error('Admin not found');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }

  async SignOut(): Promise<void> {
    const auth = getAuth(); // Initialize Firebase auth
    try {
      await signOut(auth);
      // Clear user data from local storage or perform any other necessary cleanup
      localStorage.removeItem('currentUser');
      // Redirect or navigate to the login page after logout
      // this.isUserLoggBehavior.next(false);
      this.isUserLoggedSubject.next(false);

      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  get isUserLogged():boolean
  {
return (localStorage.getItem('currentUser'))?true:false;


}



  isUserLoginS ():Observable<boolean>{
    return this.isUserLoggedSubject.asObservable();
  }
}




// {connect withauthfirebase}

// {with local storag and Guard}

// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { Observable } from 'rxjs/internal/Observable';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isUserLoggBehavior: BehaviorSubject<boolean>;
//   constructor(private afAuth: AngularFireAuth ) {
    // this.isUserLoggBehavior = new BehaviorSubject<boolean>(false);

//   }

//   async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
//     try {
//       const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
//       if (userCredential && userCredential.user) {
//         localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
        // this.isUserLoggBehavior.next(true);


//       }

//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       throw error;
//     }
//   }

//   getCurrentUser(): any {
//     const user = localStorage.getItem('currentUser');
//     return user ? JSON.parse(user) : null;
//   }

//   signOut(): Promise<void> {
//     // this.isUserLoggBehavior.next(false);
//     return this.afAuth.signOut();
//   }

//   // userStateChanged():Observable<boolean>{
//   //   return this.isUserLoggBehavior.asObservable();
//   // }

//   isUserLoggedIn(): boolean {

//     return !!localStorage.getItem('currentUser');
//   }
// }
