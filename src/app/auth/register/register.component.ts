import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

 initRegisterForm(){
  this.registerForm =  this.fb.group({
    nombre: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
 }

 createUser(){
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    
 }

}
