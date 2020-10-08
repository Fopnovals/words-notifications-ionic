import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from '../services/auth/auth.service';
import {UserStore} from '../_stores/user.store';
import {NotificationsStore} from '../_stores/notifications.store';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import {stompConfig} from '../_configs/stomp_config';
import {NotificationsService} from '../services/notifications/notifications.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserStore,
    UniqueDeviceID,
    NotificationsStore,
    NotificationsService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
