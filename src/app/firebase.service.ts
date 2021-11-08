import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  IsLoggedIn:boolean = false;
  constructor(//private firebaseAuth: AngularFireAuth
    ) { }
  // async SignIn(email: string, pass: string) {
  //   return await this.firebaseAuth.signInWithEmailAndPassword(email, pass);
  // };
  // async SignUp(email: string, pass: string) {
  //   return await this.firebaseAuth.createUserWithEmailAndPassword(email, pass);
  // };
  // async logout() {
  //   return await this.firebaseAuth.signOut();
  // }
}
