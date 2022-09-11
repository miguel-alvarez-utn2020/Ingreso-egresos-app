import { AppState } from './../../app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscribable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ui from '../../state/ui/ui.action'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  uiSubscription!: Subscription
  isLoading: boolean = false
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private store: Store<AppState>

  ) {}
  

  ngOnInit(): void {
    this.initForm();
     this.uiSubscription = this.store.select( 'ui' ).subscribe( ({ isLoading }) => {
      this.isLoading = isLoading
    } )
   
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  userLogin() {
    if (this.formLogin.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() )


    // Swal.fire({
    //   title: 'Auto close alert!',

    //   didOpen: () => {
    //     Swal.showLoading();
       
    //   },
    // })
    const { email, password } = this.formLogin.value;
    this.authSvc
      .userLogin(email, password)
      .then((resp) => {
        console.log(resp);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.store.dispatch( ui.stopLoading() )
          this.router.navigate(['/']);
          Swal.close()
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.store.dispatch( ui.stopLoading() )
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password invalid',
        });
      });

  }
}
