import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { ActivatedRoute, Params } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: L.Map;
  //idgencia;
  actualPosition = [];

  public emergencia: Emergencia = {};
  //public geolocation: Geolocation;

  constructor(private emergenciaService: EmergenciaService, 
    private route: ActivatedRoute,
    public geolocation: Geolocation) {
    
  }

  ngOnInit() {
    const idEmergencia = this.route.snapshot.params['id'];
    //this.idgencia = idEmergencia;
    this.currentPosition();
    this.getDetalles(idEmergencia);
    
  }


  ionViewDidEnter() {
      
      this.createmap();
      // this.createCurrentMarker();
      // this.createDestinyMarker();
      // this.routing();
  }

  currentPosition() {
    this.geolocation.getCurrentPosition().then(resp => {
      var lat = resp.coords.latitude
      var lon = resp.coords.longitude
      this.actualPosition = [lat, lon];
      console.log(this.actualPosition)
      }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  createmap() {
    this.map = L.map('map').setView([-3.99313, -79.2042236,], 15);
    //L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map); 
  }

  // createDestinyMarker() {
  //   var latLong = [this.emergencia.coorY,this.emergencia.coorX];
  //   console.log(latLong);
  //   var marker = L.marker(latLong,14);
  //   // tslint:disable-next-line: max-line-length
  //   var information = ('<b>Incidente:</b>'+'<br>' + this.emergencia.titulo+'<br>' +
  //             '<b>Descripcion:</b>' + '<br>' + this.emergencia.description + '<br>' +
  //             '<b>Alerta:</b>' + '<br>' + this.emergencia.alerta + '<br>');
  //   marker.addTo(this.map).bindPopup(information);
  //   //this.map.setView(this.latLong[0]);
    
  // }

  // createCurrentMarker() {
  //   var latLong = this.actualPosition;
 
  //   var marker = L.marker(latLong,14);
  //   // tslint:disable-next-line: max-line-length
  //   var information = ('<b>Posicion Actual</b>');
  //   marker.addTo(this.map).bindPopup(information);
  //   //this.map.setView(this.latLong[0]);
  //   console.log(this.actualPosition)
  // }

  // routing() {
  //   var router = new L.Routing.OSRMv1({serviceUrl: 'http://0.0.0.0:5000/route/v1'});
    
  //   const routingControl = L.Routing.control({
  //     waypoints: [
  //       this.actualPosition,
  //       [this.emergencia.coorY,this.emergencia.coorX],
  //   ],
  //   router: router,
  //   });
  //   this.map.addControl(routingControl);
  //   //routingControl.setWaypoints(waypoints); 
  // }

  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
        this.emergencia = nota;
        console.log(this.emergencia)
    });
}

}
