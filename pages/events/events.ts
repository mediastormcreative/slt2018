import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  newLikes: number;

  eventDate: string = "thurs";
  eventsThursday: FirebaseListObservable<any[]>;
  eventsFriday: FirebaseListObservable<any[]>;
  eventsSaturday: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController) {
    this.eventsThursday = afDB.list('/Events/050417', {
      query: {
        orderByChild: 'time'
      }
    });

    this.eventsFriday = afDB.list('/Events/050517', {
      query: {
        orderByChild: 'time'
        }
      });

    this.eventsSaturday = afDB.list('/Events/050617', {
      query: {
        orderByChild: 'time'
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

  getDetails(targetData) {
    let modal = this.modalCtrl.create(DetailsPage, targetData);
    modal.present();
  }

  eventLike(eventDay,date) {
    var l = {
      likes: eventDay.likes + 1
    }

    var eId = eventDay.$key;

    if (date == 4 ) {
      firebase.database().ref('Events/050417/' + eId).update(l).then(res => {});
    } else if (date == 5) {
      firebase.database().ref('Events/050517/' + eId).update(l).then(res => {});
    } else {
      firebase.database().ref('Events/050617/' + eId).update(l).then(res => {});
    }
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
