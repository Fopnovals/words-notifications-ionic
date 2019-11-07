import {action} from "mobx-angular";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserStore {
  id: number;
  professions = [];
  specializations = [];
  services = [];
  firstName: string = '';
  lastName: string = '';
  role: string = 'Customer';
  image: string = '../assets/img/avatar.jpeg';

  constructor(private http: HttpClient) {}

  @action setUser(user) {
    this.professions = user.professions;
    this.specializations = user.specializations;
    this.services = user.services;
    this.id = user.id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.role = user.role === 'user' ? 'Customer' : user.role;
    this.image = user.photo_url ? 'user.photo_url' : '../assets/img/avatar.jpeg';
  }

  @action getUserMe() {
    return new Promise((resolve, reject) => {
      this.http.get('users/me')
        .subscribe(res => {
          this.setUser(res);
          resolve(res)
        }, err => {
          reject(err);
        })
    })
  }

  @action updateUser(userParams) {
    this.http.put(`users/${this.id}`, {user: userParams})
      .subscribe((res) => {
        this.setUser(res);
      }, err => console.log(err))
  }
}