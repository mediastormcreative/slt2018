import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

declare var google;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let myLat = position.coords.latitude;
      let myLong = position.coords.longitude;

      let latLng = new google.maps.LatLng(myLat, myLong);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.startNavigating(myLat, myLong);

    }, (err) => {
      console.log('Error Msg: ' + err);
    });

  }

  startNavigating(originLat, originLong) {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      origin: { lat: originLat, lng: originLong },
      destination: { lat: 49.884, lng: -119.499 },
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.log(status);
      }

    });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
