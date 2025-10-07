import { inject, Injectable } from '@angular/core';
//import firebase from 'firebase/compat/app';
import 'firebase/database';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
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
  firestore = inject(Firestore);
  messages = collection(this.firestore, 'messages');
  user = collection(this.firestore, 'user');
  queryMessages = query(this.messages, orderBy('createdAt', 'desc'));
  constructor(private authSvc: AuthService, private router: Router) {
    this.getUseMail();

    // this.user$ = this.authSvc.getUsuario()
  }

  addChatMessage(msg: string) {
    this.getUseMail();

    return addDoc(this.messages, {
      msg: msg,
      from: this.mail,
      createdAt: serverTimestamp(),
    });
  }

  getChatMessages() {
    let users: any = [];
    this.getUseMail();
    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;

        return collectionData(this.queryMessages, { idField: 'id' });
        /*
        return this.afs
          .collection('messages', (ref) => ref.orderBy('createdAt', 'desc'))
          .valueChanges({ idField: 'id' }) as Observable<Chat[]>;
          */
      }),
      map((messages) => {
        console.log('users in chat', users);
        console.log('messages in chat', messages);
        // Get the real name for each user
        for (let m of messages) {
          // m['fromName'] = this.getUserForMsg(m['from'], users);
          m['fromName'] = m['from'];
          m['myMsg'] = this.mail === m['from'];
        }
        return messages;
      })
    );
  }

  private getUsers() {
    return collectionData(this.user, { idField: 'uid' });
    /*
    return this.afs
      .collection('user')
      .valueChanges({ idField: 'uid' }) as Observable<Usuario[]>;
      */
  }
  private async getUseMail() {
    if (await this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
    } else {
      this.mail = 'usuario anonimo';
    }
  }
  private getUserForMsg(msgFromId: any, users: Usuario[]): string {
    //   console.log('users', users);
    this.getUseMail();
    //  console.log('users mail', this.mail);
    for (let usr of users) {
      console.log('users usr.email', usr.email);
      console.log('msgFromId', msgFromId);
      console.log('his.mail == msgFromId', this.mail == msgFromId);
      if (this.mail == msgFromId) {
        return usr.email;
      }
    }
    return 'no reconocido';
  }
}
