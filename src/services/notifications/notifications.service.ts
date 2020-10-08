import { Injectable } from '@angular/core';
import {StompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private stompService: StompService) { }

  async subscribe() {
    alert('888888888888');
    const stompSubscription = await this.stompService.subscribe('/topic/words-learning');
    console.log('stompSubscription', stompSubscription);

    // stompSubscription.map((message: Message) => {
    //   return message.body;
    // }).subscribe((msgBody: string) => {
    //   alert(`Received: ${msgBody}`);
    // });
  }
}
