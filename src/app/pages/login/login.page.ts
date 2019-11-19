import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../../../_models/user.model';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: UserModel = new UserModel();

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  googleLogin(): void {
    // this.auth.googleLogin()
  }

  facebookLogin() {
    // this.auth.facebookLogin()
  }

  // go to register page
  register() {
    this.router.navigate(['/register']);
  }

  // login and go to home page
  login() {
    this.auth.login(this.user);
  }

  forgotPass() {
    // let forgot = this.forgotCtrl.create({
    //   title: 'Forgot Password?',
    //   message: "Enter you email address to send a reset link password.",
    //   inputs: [
    //     {
    //       name: 'email',
    //       placeholder: 'Email',
    //       type: 'email'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Send',
    //       handler: data => {
    //         console.log('Send clicked');
    //         let toast = this.toastCtrl.create({
    //           message: 'Email was sended successfully',
    //           duration: 3000,
    //           position: 'top',
    //           cssClass: 'dark-trans',
    //           closeButtonText: 'OK',
    //           showCloseButton: true
    //         });
    //         toast.present();
    //       }
    //     }
    //   ]
    // });
    // forgot.present();
  }

}
