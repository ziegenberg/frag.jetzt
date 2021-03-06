import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { AuthenticationService } from '../http/authentication.service';
import { User } from '../../models/user';
import { ARSRxStompConfig } from '../../rx-stomp.config';
import { Observable } from 'rxjs';
import { IMessage, StompHeaders } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WsConnectorService {
  private client: RxStomp;

  private headers = {
    'content-type': 'application/json',
    'ars-user-id': ''
  };

  constructor(
    private authService: AuthenticationService
  ) {
    this.client = new RxStomp();
    const userSubject = authService.getUserAsSubject();
    userSubject.subscribe((user: User) => {
      if (this.client.connected) {
        this.client.deactivate();
      }

      if (user && user.id) {
        const copiedConf = ARSRxStompConfig;
        copiedConf.connectHeaders.token = user.token;
        this.headers = {
          'content-type': 'application/json',
          'ars-user-id': '' + user.id
        };
        this.client.configure(copiedConf);
        this.client.activate();
      }
    });
  }

  public send(destination: string, body: string): void {
    if (this.client.connected) {
      this.client.publish({
        destination: destination,
        body: body,
        headers: this.headers
      });
    }
  }

  public getWatcher(topic: string): Observable<IMessage> {
    if (this.client.connected) {
      return this.client.watch(topic, this.headers);
    }
  }
}
