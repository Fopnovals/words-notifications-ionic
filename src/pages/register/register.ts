import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {UserModel} from "../../_models/user.model";
import {AuthProvider} from "../../providers/auth/auth";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user: UserModel = new UserModel();

  constructor(
    public nav: NavController,
    private auth: AuthProvider
  ) {
  }

  register() {
    this.auth.register(this.user)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  facebookRegister() {
    // this.auth.facebookRegister()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
