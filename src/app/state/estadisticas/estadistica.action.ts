import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { createAction, props } from "@ngrx/store"



export const setEstadisticas = createAction(
    ' [Estadistica] Set Estadisticas ',
    props<{items: IngresoEgreso[]}>()
  )

export const unSetEstadisticas = createAction(
    ' [Estadistica] UnSet Estadisticas ' 
)