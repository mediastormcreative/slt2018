import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresenterDetailsPage } from './presenter-details';

@NgModule({
  declarations: [
    PresenterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PresenterDetailsPage),
  ],
  exports: [
    PresenterDetailsPage
  ]
})
export class PresenterDetailsPageModule {}
