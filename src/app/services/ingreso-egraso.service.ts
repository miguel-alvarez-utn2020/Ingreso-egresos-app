import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IngresoEgrasoService {

  constructor( public fireStore: AngularFirestore, private authService: AuthService) { }

  createIngresoEgreso( ingresoEngreso: IngresoEgreso ){
      const uid = this.authService.userLoged.id;

     return this.fireStore.doc(`${uid}/ingreso-egresos`)
        .collection('items')
        .add({...ingresoEngreso})
  }

  initIngresoEgresoListener(uid: string){
   return this.fireStore.collection(`${uid}/ingreso-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
        
          return snapshot.map( documentItem => {

            const data: any = documentItem.payload.doc.data()
            const itemID = documentItem.payload.doc.id

            const itemDataFull = {
              id: itemID,
              ...data
            }
            return  itemDataFull
          } )
        } )
      )

  }

  deleteItem( ItemId: string ){
    const userId = this.authService.userLoged.id;
    return this.fireStore.doc(`${userId}/ingreso-egresos/items/${ItemId}`).delete()
  }

}
