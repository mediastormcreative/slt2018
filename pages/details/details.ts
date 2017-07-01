import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  eventsFriday: FirebaseListObservable<any[]>;
  eventsSaturday: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afDB: AngularFireDatabase, public modalCtrl: ModalController) {
    this.eventsSaturday = afDB.list('/Events/050617');
    this.eventsFriday = afDB.list('/Events/050517');
  }
  
  // variables passed from events, presenters and services pages
  name: string = this.navParams.get('name');
  description: string = this.navParams.get('description');
  presenter: string = this.navParams.get('presenter');
  type: string = this.navParams.get('type');
  time: string = this.navParams.get('time');
  date: string = this.navParams.get('date');
  price: string = this.navParams.get('price');
  location: string = this.navParams.get('location');
  image: string = this.navParams.get('image');
  likes: number = this.navParams.get('likes');
  eventRoster: number = this.navParams.get('eventRoster');
  cost: string = this.price;

  ionViewDidLoad() {
    console.log(this.eventsFriday);
  }

  // launch modal window with events details
  getDetails(targetData) {
    let modal = this.modalCtrl.create(DetailsPage, targetData);
    modal.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  filter(target, value) : boolean{
     // Return true if I want that specified height
     // e.g. show only dinosaurs with a height of 4
     if (target.presenter == value){
       return false;
     }
     return true; 
  }

}
