import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalStore} from "../../_stores/global.store";
import {UserStore} from "../../_stores/user.store";
import {cloneDeep} from "lodash"

@IonicPage()
@Component({
  selector: 'page-worker-profile',
  templateUrl: 'worker-profile.html',
})
export class WorkerProfilePage {

  public services = [];
  public newProfession = '';
  public newSpecialization = '';
  public newService = '';
  public addingNew = '';
  public user = cloneDeep(this.userStore)

  constructor(
    public globalStore: GlobalStore,
    public userStore: UserStore,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.setWorkerSettings()
  }

  setWorkerSettings() {
    this.globalStore.getProfessions();
    if (this.user.professions[0]) this.changeProfession();
    if (this.user.specializations[0]) this.changeSpecialization();
  }

  changeProfession() {
    this.globalStore.getSpecializations(this.user.professions[0]);
  }

  changeSpecialization() {
    this.globalStore.getServices(this.user.specializations[0])
      .then(() => {
        this.createServices()
      })
      .catch(err => console.log(err))
  }

  createServices() {
    let services = cloneDeep(this.globalStore.services)
    services.forEach((service) => {
      service.selected = this.user.services.indexOf(service.id) !== -1
    })
    this.services = services
  }

  updateUserServices() {
    let servicesIds = []
    this.services.forEach((service) => {
      if(service.selected) {
        servicesIds.push(service.id);
      }
    })
    this.user.services = servicesIds
  }

  addService() {
    this.globalStore.addService(this.user.specialization, this.newService)
      .then(() => {
        this.newService = '';
      })
      .catch(err => console.log(err))
  }

  addProfession() {
    this.globalStore.addProfession(this.newProfession)
      .then((res: any) => {
        this.newProfession = '';
        this.user.professions = [res.id];
      })
      .catch(err => console.log(err))
  }

  addSpecialization() {
    this.globalStore.addSpecialization(this.user.profession, this.newSpecialization)
      .then((res: any) => {
        this.newSpecialization = '';
        this.user.specializations = [res.id];
      })
      .catch(err => console.log(err))
  }

  save() {
    this.userStore.updateUser(this.user)
  }

}
