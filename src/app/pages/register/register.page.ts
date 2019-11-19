import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import {UserModel} from '../../../_models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user: UserModel = new UserModel();

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.user)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
}
