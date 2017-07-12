import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details'; 

@IonicPage()
@Component({
  selector: 'page-attendees',
  templateUrl: 'attendees.html',
})
export class AttendeesPage {

  attendees: FirebaseListObservable<any[]>;
  keyList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController ) {
    this.attendees = afDB.list('/Attendees', {
      query: {
        orderByChild: 'userName'
      }
    });

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

}
