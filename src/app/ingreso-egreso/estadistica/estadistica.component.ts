import { filter } from 'rxjs/operators';
import { Estadistica } from './../../models/estadistica.model';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { pipe, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store} from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit, OnDestroy{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  estadistica: Estadistica = {
    totalIngresos: 0,
    cantIngresos: 0,
    totalEgresos: 0,
    cantEgresos: 0,
    diferencia: 0,
  } ;
  ingresoEgresosSubscription: Subscription;
  estadisticaSubscription: Subscription
  ingresoEgresos: IngresoEgreso[] = [];

  public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}
  
  

  ngOnInit(): void {
    this.ingresoEgresosSubscription = this.store
      .select('ingresoEgreso')
      .subscribe((ingresoEgresos) => {
        this.estadisticas(ingresoEgresos.items);
      });  
  }

  ngOnDestroy(): void {
    this.estadisticaSubscription.unsubscribe()
    this.ingresoEgresosSubscription.unsubscribe()
  }

  estadisticas(items: IngresoEgreso[]) {
    this.estadisticaSubscription = this.store.select('estadisticas')
    .subscribe(({ estadisticas }) => {
      if(estadisticas){
        let ingresos = estadisticas.totalIngresos
        let Egresos = estadisticas.totalEgresos
        this.doughnutChartData.datasets = [{data: [Egresos, ingresos]}]
        this.estadistica = estadisticas;
      }
    })
    
  }

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
