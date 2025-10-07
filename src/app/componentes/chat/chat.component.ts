import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  chatSer = inject(ChatService);
  router = inject(Router);
  @ViewChild('.container') content: any;
  state: boolean;
  icons: any;
  args: any;
  chatBoxContent: any;
  chatboxStatus: any;
  messages!: Observable<any[]>;
  newMsg = '';
  constructor() {
    this.state = false;
    this.messages = this.chatSer.getChatMessages();
  }

  toggleState() {
    this.state = !this.state;
    this.showOrHideChatBox();
  }

  showOrHideChatBox() {
    if (this.state) {
      this.chatboxStatus = 'chatbox--active';
    } else if (!this.state) {
      this.chatboxStatus = 'chatbox--inactive';
    }
  }

  sendMessage() {
    this.chatSer.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      // this.content.scrollToBottom();
    });
  }
}
