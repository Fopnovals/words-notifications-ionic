import {action, computed} from 'mobx-angular';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GlobalStore {
  professions = [];
  specializations:any = [];
  services = [];
  myServices = [];

  constructor(private http: HttpClient) {}

  @action getProfessions() {
    this.http.get('professions')
      .subscribe((res: Array<any>) =>{
        this.professions = res
      })
  }

  @action addProfession(profession) {
    return new Promise((resolve, reject) => {
      this.http.post('professions', {name: profession})
        .subscribe((res) => {
          this.getProfessions()
          resolve(res)
        }, err => reject(err))
    })
  }

  @action getSpecializations(professionId) {
    this.http.get(`professions/${professionId}/specializations`)
      .subscribe((res) => {
        this.specializations = res;
      }, err => console.log(err))
  }

  @action addSpecialization(professionId, specialization) {
    return new Promise((resolve, reject) => {
      this.http.post(`professions/${professionId}/specializations`, {name: specialization})
        .subscribe((res: any) => {
          this.getSpecializations(res.profession_id);
          resolve(res);
        }, err => reject(err))
    })
  }

  @action getServices(specializationIds) {
    return new Promise((resolve, reject) => {
      this.http.get(`specializations/${specializationIds}/services`)
        .subscribe((res: any) => {
          this.services = res;
          resolve()
        }, err => {
          reject(err)
        })
    })
  }

  @action addService(specializationId, service) {
    return new Promise((resolve, reject) => {
      this.http.post(`specializations/${specializationId}/services`, {name: service})
        .subscribe((res: any) => {
          this.getServices(res.specialization_id);
          resolve(res);
        }, err => reject(err))
    })
  }

}