import {action, computed} from 'mobx-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsStore {
  pushesData = [];

  constructor() {}

  @action addNotification(push) {
    this.pushesData.push(push);
  }

  @action clearNotifications() {
    this.pushesData = [];
  }

  @computed get pushes() {
    return this.pushesData;
  }
}
