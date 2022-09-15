import { Estadistica } from './models/estadistica.model';
import { State } from './models/ui.model';
import { ActionReducerMap } from '@ngrx/store';
import * as  ui from './state/ui/ui.reducer';
import * as  auth from './state/auth/auth.reducer';
import * as ingresoEgreso from './state/ingreso-egreso/ingreso-egreso.reducer'
import * as estadisticas from './state/estadisticas/estadistica.reducer'
export interface AppState {
   ui: ui.State
   auth: auth.State
   ingresoEgreso: ingresoEgreso.State
   estadisticas: estadisticas.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
   ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
   estadisticas: estadisticas.estaditicasReducer
}