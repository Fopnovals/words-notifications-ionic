import {Injectable, ViewChild} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../_constants/urls';
import {Events, Nav} from "ionic-angular";
import 'rxjs/add/operator/do'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  @ViewChild(Nav) nav: Nav;

  constructor(
    public events: Events
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const bearer = `Bearer ${localStorage.getItem('jwt')}`;

      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          Authorization: bearer
        },
        url: `${baseUrl}/${request.url}`
      });
    console.log(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.events.publish("unauthorized:requestError");
        } else if (err.status === 408) {
          this.events.publish("timeout:requestError");
        }
      } else if (err.name === "TimeoutError") {
        this.events.publish("timeout:requestError");
      }
    });
  }
}