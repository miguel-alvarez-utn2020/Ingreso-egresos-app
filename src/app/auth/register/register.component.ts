import { Subscription } from 'rxjs';
import { isLoading } from './../../state/ui/ui.action';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as ui from '../../state/ui/ui.action'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoading: boolean = false
  uiSubscription!: Subscription
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.initRegisterForm();
     this.uiSubscription = this.store.select( 'ui' ).subscribe( ({ isLoading }) => {
      console.log(isLoading);
      
        this.isLoading = isLoading;

        console.log('is loading in register', this.isLoading);
        
    } )
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }


  initRegisterForm() {
    this.registerForm = this.fb.group({
      nombre: [''],
      email: [''],
      password: [''],
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() )
    console.log(this.registerForm.value)
    const { nombre, email, password } = this.registerForm.value;

    this.authSvc
      .createUser(nombre, email, password)
      .then(({ user }) => {
        console.log(user);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your are register',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          const newUser: User = {
            id: user?.uid,
            name: nombre,
            email,
          };
          this.fireStore.doc(`${user?.uid}/user`).set({ ...newUser });
          this.store.dispatch( ui.stopLoading() )
          this.router.navigate(['/login']);
        });
      })
      .catch((err) => {
        this.store.dispatch( ui.stopLoading() )
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The email address is already in use by another account.',
        });
      });
  }
}
