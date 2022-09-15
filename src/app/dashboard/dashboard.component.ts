import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'
import { IngresoEgrasoService } from './../services/ingreso-egraso.service';
import * as ingresoEngresoAction from '../state/ingreso-egreso/ingreso-egreso.action'
import * as estadisticasAction from '../state/estadisticas/estadistica.action'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptionAuth: Subscription
  subscriptionIngresoEgreso: Subscription
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgrasoService) { }
  

  ngOnInit(): void {
    this.subscriptionAuth = this.store.select( 'auth' )
    .pipe(
      filter( auth => auth.user !== null )
    )
    .subscribe( ({ user }) => {
      console.log(user);
       this.subscriptionIngresoEgreso = this.ingresoEgresoService.initIngresoEgresoListener( user.id )
        .subscribe( ingresoEgresos => {
          this.store.dispatch( estadisticasAction.setEstadisticas( {items: ingresoEgresos} ) )
          this.store.dispatch( ingresoEngresoAction.setItems( { items: ingresoEgresos } ) )
        } )
    } )
  }

  ngOnDestroy(): void {
    this.subscriptionAuth.unsubscribe()
    this.subscriptionIngresoEgreso.unsubscribe()
  }

}
