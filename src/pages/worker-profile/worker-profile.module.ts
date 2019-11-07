import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerProfilePage } from './worker-profile';

@NgModule({
  declarations: [
    WorkerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerProfilePage),
  ],
})
export class WorkerProfilePageModule {}
