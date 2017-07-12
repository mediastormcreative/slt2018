import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
      let data = {
        userName: user.displayName,
        userEmail: user.email,
        userTel: user.phoneNumber,
        userImg: user.photoURL
      };
      // Retrieves path to top Node for attendees
      var usersRef = firebase.database().ref('Attendees/');
      // Checks if user Id already exists
      usersRef.child(user.uid).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
       if (exists) {
        console.log('user ' + user.uid + ' exists!');
      } else {
        // Writes new user to database only if user id does not exist
        firebase.database().ref('Attendees/' + user.uid).set(data).then(res => {});
      }
    });
      // Go to home page :)
      this.navCtrl.setRoot(HomePage,data);
    });
  }




  ionViewDidLoad() {}

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }


  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
