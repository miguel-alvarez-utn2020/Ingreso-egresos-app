import { stopLoading } from './../state/ui/ui.action';
import { Subscription } from 'rxjs';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { IngresoEgrasoService } from './../services/ingreso-egraso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import  Swal  from 'sweetalert2';
import * as uiAction from '../state/ui/ui.action'


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  isLoading: boolean = false
  formIngresoEgreso: FormGroup
  typeEntry: string = 'ingreso'
  subscriptionLoading: Subscription
  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgrasoService, private store: Store<AppState>) { }
  

  ngOnInit(): void {
    this.initFormIngreseEgreso()
   this.subscriptionLoading = this.store.select( 'ui' ).subscribe( ui => {
      this.isLoading = ui.isLoading;
      console.log('isLoading',this.isLoading);
      
    } )
  }

  ngOnDestroy(): void {
    this.subscriptionLoading.unsubscribe()
  }

  initFormIngreseEgreso(){
    this.formIngresoEgreso = this.fb.group({
      description: ['', Validators.required],
      amount:['', [Validators.required, Validators.min( 0 )]] 
    })
  }

  saveIngresoEgreso(){
    
    if(this.formIngresoEgreso.invalid){ return };
    
    this.store.dispatch( uiAction.isLoading() );

    const { description, amount } = this.formIngresoEgreso.value;

    const ingresoEgresoPaylaod: IngresoEgreso = {
      description,
      amount,
      typeEntry: this.typeEntry
    }

    this.ingresoEgresoService.createIngresoEgreso( ingresoEgresoPaylaod )
      .then( () => {
        
        Swal.fire({
          icon: 'success',
          title: description,
          text: 'Register ok',
        });
        this.store.dispatch( stopLoading() )
        this.formIngresoEgreso.reset()
      } )
      .catch( () => {
        this.store.dispatch( stopLoading() )
        Swal.fire({
          icon: 'error',
          title: description,
          text: 'Register faile',
        });
      } )
      
    console.log(this.formIngresoEgreso.value, this.typeEntry);
  }
  

}
