import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private geolocation: Geolocation) { }

  alctualposition(){
    this.geolocation.getCurrentPosition().then((resp) => {
    resp.coords.latitude
    resp.coords.longitude
    }).catch((error) => {
    console.log('Error getting location', error);
    });
  }

    destiny(){
      this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude
      resp.coords.longitude
      }).catch((error) => {
      console.log('Error getting location', error);
      });
    }
}
