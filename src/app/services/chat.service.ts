import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { Chat } from '../clases/chat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  mail: any;

  constructor(
    private afs: AngularFirestore,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.getUseMail();

    // this.user$ = this.authSvc.getUsuario()
  }

  addChatMessage(msg: string) {
    this.getUseMail();
    return this.afs.collection('messages').add({
      msg: msg,
      from: this.mail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChatMessages() {
    let users: any = [];
    this.getUseMail();
    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs
          .collection('messages', (ref) => ref.orderBy('createdAt', 'desc'))
          .valueChanges({ idField: 'id' }) as Observable<Chat[]>;
      }),
      map((messages) => {
        // Get the real name for each user
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.mail === m.from;
        }
        return messages;
      })
    );
  }

  private getUsers() {
    return this.afs
      .collection('user')
      .valueChanges({ idField: 'uid' }) as Observable<Usuario[]>;
  }
  private async getUseMail() {
    if (await this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
    } else {
      this.mail = 'usuario anonimo';
    }
  }
  private getUserForMsg(msgFromId: any, users: Usuario[]): string {
    // console.log("users", users);
    this.getUseMail();
    console.log('users mail', this.mail);
    for (let usr of users) {
      console.log('users usr.email', usr.email);
      console.log('msgFromId', msgFromId);
      if (this.mail == msgFromId) {
        return usr.email;
      }
    }
    return 'no reconocido';
  }
}
