import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  services: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController) {
    this.services = afDB.list('/Services');
  }

  ionViewDidLoad() {
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
	}

  getDetails(targetData) {
    let modal = this.modalCtrl.create(DetailsPage,targetData);
    modal.present();
  }

}
