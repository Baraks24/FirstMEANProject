import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ChatService} from '../../services/chat/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  messageText :string;
  messages: Array<any>
  constructor(private chatService:ChatService) {}

  ngOnInit() {
    this.messages = new Array();
    this.chatService.on('chatMessage', (msg) => {this.messages.push(msg);msg.created=new Date(msg.created).toDateString()});
  }
  
  sendMessage(){
    const message = {
      text: this.messageText
    };
    this.chatService.emit('chatMessage',message);
    this.messageText = '';
  }

  ngOnDestroy(){
    this.chatService.removeListener('chatMessage');
  }

}
 