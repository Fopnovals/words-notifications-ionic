import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
// import { GooglePlus } from '@ionic-native/google-plus';
// import {Facebook} from "@ionic-native/facebook";
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import {Firebase} from '@ionic-native/firebase';
import {get} from 'lodash';
import {HomePage} from "../../pages/home/home";
import {UserStore} from "../../_stores/user.store";
import {Platform, ToastController} from "ionic-angular";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthProvider {

  constructor(
    // private facebook: Facebook,
    private http: HttpClient,
    private platform: Platform,
    // private firebase: Firebase,
    private toastCtrl: ToastController,
    private userStore: UserStore
  ) {}

  register(user) {
    let newUser = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword
    }
    return new Promise((resolve, reject) => {
      this.http.post('users', {user: newUser})
        .subscribe(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }

  facebookRegister() {
    return new Promise((resolve, reject) => {
      // this.facebook.login(['email', 'public_profile'])
      //   .then( response => {
      //     const facebookCredential = firebase.auth.FacebookAuthProvider
      //       .credential(response.authResponse.accessToken);
      //     firebase.auth().signInWithCredential(facebookCredential)
      //       .then( res => {
      //         const user = {
      //           first_name: get(res, 'additionalUserInfo.profile.first_name'),
      //           last_name: get(res, 'additionalUserInfo.profile.last_name'),
      //           email: get(res, 'additionalUserInfo.profile.email'),
      //           phone_number: get(res, 'user.phoneNumber'),
      //           email_verified: get(res, 'user.emailVerified'),
      //           photo_uRL: get(res, 'user.photoURL'),
      //           provider: 'facebook.com',
      //           uid: get(res, 'user.uid')
      //         }
      //         this.register(user)
      //           .then(res => resolve(res))
      //           .catch(err => reject(err));
      //       })
      //       .catch(err => reject(err))
      //   }).catch(err => reject(err));
    })
  }

  googleLogin() {
    // this.http.get('users')
    //   .subscribe(res => console.log(res),
    //       err => console.log(err))
    // let a = new firebase.auth.GoogleAuthProvider()
    // console.log(a);

    // this.googlePlus.login({
    //   'webClientId': '279163470610-vb8b1gtrtojogl56cagb72p76ampes6e.apps.googleusercontent.com',
    //   'offline': true
    // }).then( res => console.log(res))
    //   .catch(err => console.error(err));
  }

  // facebookLogin(): Promise<any> {
    // return this.facebook.login(['email', 'public_profile'])
    //   .then( response => {
    //     const facebookCredential = firebase.auth.FacebookAuthProvider
    //       .credential(response.authResponse.accessToken);
    //     firebase.auth().signInWithCredential(facebookCredential)
    //       .then( success => {
    //         console.log("Firebase success: " + JSON.stringify(success));
    //         // resolve(success);
    //       });
    //   }).catch((error) => {
    //     console.log(error);
    //     // reject(error);
    //   });
  // }

  firebaseNotifications() {
    // return new Promise((resolve, reject) => {
    //   if (this.platform.is('ios')) {
    //     this.firebase.getToken()
    //       .then(r => {
    //         console.log(r);
    //       })
    //
    //     this.firebase.grantPermission()
    //       .then(() => {
    //         console.log('q11111');
    //           return this.firebase.hasPermission()
    //             .then((data) => {
    //               return data.isEnabled;
    //             })
    //             .catch((err) => {
    //               reject(err);
    //               return false;
    //             })
    //         }
    //       )
    //       .then((success) => {
    //         if (success) {
    //           this.firebase.getToken().then((token) => {
    //             this.postDeviceId(token)
    //             // localStorage.setItem('device_token', JSON.stringify(token));
    //             resolve(true);
    //           }); // save the token server-side and use it to push notifications to this device
    //           console.debug("Sucessfully got push notification permission");
    //         } else {
    //           reject();
    //           console.debug("Failed to get push notification permission", success);
    //         }
    //       })
    //       .catch((e) => {
    //         reject();
    //         console.error("Error when trying to get permission for Firebase: " + e, e);
    //       });
    //   } else if (this.platform.is('android')) {
    //     this.firebase.getToken().then((token) => {
    //       this.postDeviceId(token)
    //       // localStorage.setItem('device_token', JSON.stringify(token));
    //       resolve(true);
    //     })
    //       .catch((err) => {
    //         reject();
    //         console.log(err);
    //       })
    //   }
    //
    // })
  }

  postDeviceId(token) {
    this.http.post(`device_id`, {device_id: token})
      .subscribe((res) => {
        console.log(res);
      }, err => {
        console.log(err);
      })
  }
  public getDeviceToken() {
    return localStorage.getItem('device_token');
  }

  login(user, navCtrl) {
    const params = {
      email: user.email,
      password: user.password
    }
    this.http.post('login', {...params})
      .subscribe((res) => {
        this.userStore.setUser(res);
        navCtrl.setRoot(HomePage);
        this.enablePushNotifications()
        localStorage.setItem('jwt', res['token']);
      }, err => {
        console.log(err);
      })
  }

  enablePushNotifications() {
    // this.firebaseNotifications().then((r) => {
    //   if (r) {
    //     this.startToListening();
    //   }
    // });
  }

  listenToNotifications() {
    // return this.firebase.onNotificationOpen()
  }

  startToListening() {
    // this.listenToNotifications().pipe(
    //   tap((msg: any) => {
    //     console.log('MESSAGE');
    //     console.log(msg);
    //     const toast = this.toastCtrl.create({
    //       message: msg.body,
    //       duration: 5000,
    //       position: 'top'
    //     });
    //     toast.present();
    //   })
    // )
    //   .subscribe()
  }
}
