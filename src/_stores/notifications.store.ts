import {action, computed} from 'mobx-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsStore {
  pushes = [];

  constructor() {}

  @action addNotification(push) {
    this.pushes.push(push);
  }

  @action clearNotifications() {
    this.pushes = [];
  }
}
