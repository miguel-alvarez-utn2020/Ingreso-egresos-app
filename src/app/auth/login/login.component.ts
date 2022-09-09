import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
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

    Swal.fire({
      title: 'Auto close alert!',

      didOpen: () => {
        Swal.showLoading();
       
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      
    });
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
          this.router.navigate(['/']);
          Swal.close()
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password invalid',
        });
      });

  }
}
