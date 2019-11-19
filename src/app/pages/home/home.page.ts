import { Component } from '@angular/core';
import {NotificationsStore} from '../../../_stores/notifications.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public notificationsStore: NotificationsStore
  ) {}

  clearNotifications() {
    this.notificationsStore.clearNotifications();
  }
}
