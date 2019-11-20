import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStore} from '../../_stores/user.store';
import {Router} from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import {NotificationsStore} from '../../_stores/notifications.store';
import {ToastController} from '@ionic/angular';

@Injectable()
export class AuthService {

  constructor(
    private fcm: FCM,
    private http: HttpClient,
    private userStore: UserStore,
    private router: Router,
    private notificationsStore: NotificationsStore,
    private toastCtrl: ToastController
  ) { }

  register(user) {
    const newUser = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword
    }
    return new Promise((resolve, reject) => {
      this.http.post('users', {user: newUser})
        .subscribe(res => {
          resolve(res);
          this.login(user);
        }, err => {
          reject(err);
        });
    });
  }

  login(user) {
    const params = {
      email: user.email,
      password: user.password
    }
    this.http.post('login', {...params})
      .subscribe((res) => {
        this.userStore.setUser(res);
        this.initNotifications();
        this.getToken()
        localStorage.setItem('jwt', res['token']);
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
  }

  postDeviceId(token) {
    this.http.post(`device_id`, {device_id: token})
      .subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  checkToken() {
    return new Promise((resolve) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        this.userStore.getUserMe()
          .then(() => {
            this.router.navigate(['/home']);
            this.initNotifications();
            this.getToken()
            resolve();
          })
          .catch(err => {
            console.log(err);
            resolve();
          });
      } else {
        this.router.navigate(['/login']);
        resolve();
      }
    });
  }

  async showToast(data) {
    const toast = await this.toastCtrl.create({
      message: data.body,
      duration: 20000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  // FCM
  initNotifications() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log(data)
        console.log('Received in background');
        this.notificationsStore.addNotification(data);
        // this.pushes.push({
        //   body: data.body,
        //   title: data.title
        // })
      } else {
        console.log(data)
        console.log('Received in foreground');
        this.notificationsStore.addNotification(data);
        console.log(this.notificationsStore);
        this.showToast(data);
        // this.pushes.push({
        //   body: data.body,
        //   title: data.title
        // })
      }
      if (data.route) {
        this.router.navigateByUrl(data.route);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.postDeviceId(token);
    });
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('all');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      this.postDeviceId(token);
    });
  }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('all');
  }
}
