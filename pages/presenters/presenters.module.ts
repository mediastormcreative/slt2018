import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentersPage } from './presenters';

@NgModule({
  declarations: [
    PresentersPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentersPage),
  ],
  exports: [
    PresentersPage
  ]
})
export class PresentersPageModule {}
