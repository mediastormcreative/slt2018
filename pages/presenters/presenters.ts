import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-presenters',
  templateUrl: 'presenters.html',
})
export class PresentersPage {

  presenters: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController ) {
    this.presenters = afDB.list('/Presenters');
  }

  ionViewDidLoad() {}

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
