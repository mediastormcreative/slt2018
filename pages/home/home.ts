import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

import { LoginPage } from '../login/login';
import { EventsPage } from '../events/events';
import { ServicesPage } from '../services/services';
import { PresentersPage } from '../presenters/presenters';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public navParams: NavParams) {}

  userName: string = this.navParams.get('userName')

  ionViewDidLoad() {
  }

   goToEvents(){
    this.navCtrl.setRoot(EventsPage);
	}

  goToServices(){
    this.navCtrl.setRoot(ServicesPage);
	}

  goToPresenters(){
    this.navCtrl.setRoot(PresentersPage);
	}

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

}
