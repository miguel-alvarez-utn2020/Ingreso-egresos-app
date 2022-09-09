import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  initAuthListener(){
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      
    } )
  }

  createUser(name: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  userLogin(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

}
