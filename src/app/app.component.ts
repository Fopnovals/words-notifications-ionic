import { Component, ViewChild } from "@angular/core";
import {Platform, Nav, Events} from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import {UserStore} from "../_stores/user.store";
import {AuthProvider} from "../providers/auth/auth";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public userStore: UserStore,
    public events: Events,
    private auth: AuthProvider
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.events.subscribe("unauthorized:requestError", () => {
        this.nav.setRoot(LoginPage);
      })
      if (localStorage.getItem('jwt')) {
        this.userStore.getUserMe()
          .then(() => {
            this.nav.setRoot(HomePage);
            this.enablePushNotifications()
          })
          .catch(err => console.log(err))
      }
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      // this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false);
      // this.initializeFirebase();

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);
    });
  }

  enablePushNotifications() {
    // this.auth.firebaseNotifications().then((r) => {
    //   if (r) {
    //     this.auth.startToListening();
    //   }
    // });
  }

  initializeFirebase() {
    // firebase.initializeApp(config);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
