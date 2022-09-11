import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as authAction from '../state/auth/auth.action'
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subscriptionFireStore: Subscription

  constructor(
    public auth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
      this.auth.authState.subscribe((fuser) => {
        console.log('init');
        
      if(fuser !== null){
        
        //si existe usuario
        //llamada al endpoint
       this.subscriptionFireStore = this.fireStore.doc(`${ fuser.uid }/user`).valueChanges().subscribe( (fireStoreUser: any) => {
        console.log('entro al if', fuser);

          const {email, name, id } = fireStoreUser;
          const user: User = {
            email,
            name,
            id
          }
          this.store.dispatch( authAction.setUser( { user } ) )
          console.log('Usuario', fireStoreUser);
          
        } )
        
      }else{
        console.log('entro al else', fuser);
        
        //si no existe el usuario
        this.subscriptionFireStore.unsubscribe()
        this.store.dispatch( authAction.unSetUser() )
      }

    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  userLogin(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }
}
