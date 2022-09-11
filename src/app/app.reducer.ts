import { State } from './models/ui.model';
import { ActionReducerMap } from '@ngrx/store';
import * as  ui from './state/ui/ui.reducer';
import * as  auth from './state/auth/auth.reducer';


export interface AppState {
   ui: ui.State
   auth: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer
}