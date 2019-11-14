import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {UserModel} from "../../_models/user.model";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public user: UserModel = new UserModel();

  constructor(
    public nav: NavController
  ) {
    this.user.role = 'worker';
  }


  logout() {
    this.nav.setRoot(LoginPage);
  }

  goToWorkerProfile() {
    this.nav.push('WorkerProfilePage')
  }
}
