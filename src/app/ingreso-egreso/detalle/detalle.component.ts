import { isLoading, stopLoading } from './../../state/ui/ui.action';
import { IngresoEgrasoService } from './../../services/ingreso-egraso.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  ingresoEgresoSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgrasoService
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => (this.ingresoEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  delete(item: IngresoEgreso) {
    this.ingresoEgresoService
      .deleteItem(item.id)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `${item.description}`,
          text: 'Deleted',
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: `${item.description}`,
          text: 'Error, on Deleted',
        });
      });
  }
}
