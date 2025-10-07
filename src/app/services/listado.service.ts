import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lista } from '../clases/lista';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  FieldValue,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  mail!: string | null;
  firestore = inject(Firestore);
  lista = collection(this.firestore, 'listados');
  queryLista = query(this.lista, orderBy('createdAt', 'desc'));
  constructor(private authSvc: AuthService, private router: Router) {
    this.getUserMail();
  }

  addResultado(result: Lista) {
    this.getUserMail();
    let listas = [];

    return addDoc(this.lista, {
      usuario: this.mail,
      tiempo: result.tiempo,
      resultado: result.resultado,
      clicks: result.clicks,
      juego: result.juego,
      correctas: result.correctas,
      errores: result.errores,
      createdAt: serverTimestamp(),
    });
  }

  getListas() {
    this.getUserMail();
    let listas: Lista[] = [];
    this.getUserMail();
    return this.getListado().pipe(
      switchMap((res) => {
        listas = res;
        return collectionData(this.queryLista, { idField: 'id' });
      })
    );
  }

  private getListado() {
    // return this.afs.collection('user').valueChanges({ idField: 'uid' }) as Observable<User[]>;
    return collectionData(this.queryLista, { idField: 'id' });
  }

  private async getUserMail() {
    if (this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
    } else {
      this.mail = 'usuario anonimo';
    }
  }
}
