import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../config/config';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private socket: any;
  constructor(private config:Config) {
    this.socket = io(this.config.apiUrl);
  }

  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, function (data) {
        callback(data);
      });
    }
  };
  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  };
  removeListener(eventName) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  };

}
