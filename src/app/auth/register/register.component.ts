import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }
    const { nombre, email, password } = this.registerForm.value;

    this.authSvc
      .createUser(nombre, email, password)
      .then((credenciales) => {
        console.log(credenciales);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your are register',
          showConfirmButton: false,
          timer: 1500
        }).then( () => {
          this.router.navigate(['/login']);
        } )
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The email address is already in use by another account.',
        })
      })
  }
}
