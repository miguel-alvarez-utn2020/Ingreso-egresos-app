import { Estadistica } from './../../models/estadistica.model';
import { createReducer, on } from "@ngrx/store";
import { setEstadisticas, unSetEstadisticas } from './estadistica.action'
export interface State{
    estadisticas: Estadistica
}

export const initialState: State = {
  estadisticas: {} as Estadistica
}

const _estadisticasReducer = createReducer(initialState, 
    on(unSetEstadisticas, state => ({...state, estadisticas: {} as Estadistica })),
    on(setEstadisticas, (state,  { items } ) => {
        let totalIngresos = 0
        let cantIngresos = 0
        let totalEgresos = 0
        let cantEgresos = 0
        let diferencia = 0
        for (const item of items ) {
            if(item.typeEntry === 'ingreso'){
                totalIngresos += parseFloat(item.amount)
                cantIngresos++;
            }else{
                totalEgresos += parseFloat(item.amount)
                cantEgresos;
            }
        }
        diferencia = totalIngresos - totalEgresos;
        if(diferencia < 0){
            diferencia = 0
        }
        const estadisticas: Estadistica = {
            totalIngresos,
            cantIngresos,
            totalEgresos,
            cantEgresos,
            diferencia,
        }
        return {...state, estadisticas}
    } ),
    
)

export function estaditicasReducer(state, action) {
    return _estadisticasReducer(state, action);
}