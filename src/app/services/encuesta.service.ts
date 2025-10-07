import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
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
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Encuesta } from '../clases/encuesta';
@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  firestore = inject(Firestore);
  encuesta = collection(this.firestore, 'encuesta');
  queryEncuesta = query(this.encuesta, orderBy('createdAt', 'desc'));
  mail!: string | null;
  constructor(private authSvc: AuthService, private router: Router) {
    this.getUserMail();
  }

  addEncuesta(encuesta: Encuesta) {
    this.getUserMail();
    return addDoc(this.encuesta, {
      user: encuesta.user,
      pregunta1: encuesta.pregunta1,
      respuesta1: encuesta.respuesta1,
      pregunta2: encuesta.pregunta2,
      respuesta2: encuesta.respuesta2,
      pregunta3: encuesta.pregunta3,
      respuesta3: encuesta.respuesta3,
      nombre: encuesta.nombre,
      apellido: encuesta.apellido,
      edad: encuesta.edad,
      telefono: encuesta.telefono,
      sexo: encuesta.sexo,
      createdAt: serverTimestamp(),
    });
  }

  getEncuestas() {
    this.getUserMail();
    let listas: Encuesta[] = [];
    this.getUserMail();
    return this.getEncuesta().pipe(
      switchMap((res) => {
        //  listas = res;
        return collectionData(this.queryEncuesta, { idField: 'id' });
      })
    );
  }

  private getEncuesta() {
    return collectionData(this.queryEncuesta, { idField: 'id' });
  }

  private async getUserMail() {
    if (await this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
      console.log(this.mail);
    } else {
      this.mail = 'usuario anonimo';
    }
  }
}
