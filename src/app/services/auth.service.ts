import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
  serverTimestamp,
  addDoc,
} from '@angular/fire/firestore';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;
  public usuario$: Observable<any>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private error: ErrorService
  ) {
    this.user$ = authState(this.auth);

    this.usuario$ = authState(this.auth).pipe(
      map((user) => {
        if (user) {
          console.log(user);
          return user;
        }
        return of(null);
      })
    );
  }

  async registro(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e: any) {
      console.log(e.message);
      console.log(e.code);
      throw new Error(this.error.getError(e.code));

      // return e;
    }
  }

  async login(email: any, password: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.updateLogUser(email);
      return user;
    } catch (e: any) {
      throw new Error(this.error.getError(e.code));
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUsuarioFire() {
    const user = this.auth.currentUser;

    return user;
  }

  async updateLogUser(email: string) {
    const user = this.auth.currentUser;
    const userlogCol = collection(this.firestore, 'userlog');
    try {
      console.log('usuario logueado', user);
      await addDoc(userlogCol, {
        email: email,
        fechaIngreso: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
