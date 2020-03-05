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

    actual_lat: number
    actual_lon: number

    public emergencia: Emergencia = {};
  //public geolocation: Geolocation;

  constructor(private emergenciaService: EmergenciaService, 
    private route: ActivatedRoute,
      public geolocation: Geolocation) {
      
  }

  ngOnInit() {
    const idEmergencia = this.route.snapshot.params['id'];
    
    
    this.getDetalles(idEmergencia);
    this.currentPosition();
  }


  ionViewDidEnter() {
      
      this.createmap();
      // Marca las posiciones
      this.createDestinyMarker();
      this.createCurrentMarker();
      // trasar ruta
      this.routing();
    }

    ionDidLeave() {
        this.map.remove();
    }

    currentPosition() {
        this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
            this.actual_lat = geoposition.coords.latitude
            this.actual_lon = geoposition.coords.longitude

            console.log(this.actual_lat, this.actual_lon)
            }).catch((error) => {
                console.log('Error getting location', error);
            });

    }

  createmap() {
    this.map = new L.Map('map').setView([-3.99313, -79.2042236,], 15);
    //L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map); 
  }

  createDestinyMarker() {
     
      var marker = L.marker(L.latLng(this.emergencia.latitud, this.emergencia.longitud));
  
      var information = ('<b>Incidente:</b>'+'<br>' + this.emergencia.titulo+'<br>' +
              '<b>Descripcion:</b>' + '<br>' + this.emergencia.description + '<br>' +
              '<b>Alerta:</b>' + '<br>' + this.emergencia.alerta + '<br>');
      marker.addTo(this.map).bindPopup(information);
  }

  createCurrentMarker() {
      var myIcon = L.icon({
          iconUrl: 'assets/gps2.png',
          iconSize: [38, 50],
          iconAnchor: [22, 74],
          
      });

      var marker = L.marker(L.latLng(this.actual_lat, this.actual_lon), { icon: myIcon }) ;
      var information = ('<b>Posicion Actual</b>');
      marker.addTo(this.map).bindPopup(information);
    
  }

    routing() {
    // ruta del server OSRM propio
    var router = new L.Routing.OSRMv1({serviceUrl: 'http://0.0.0.0:5000/route/v1'});
  
    const routingControl = L.Routing.control({
        waypoints: [
            L.latLng(this.actual_lat, this.actual_lon),
            L.latLng(this.emergencia.latitud, this.emergencia.longitud)
    ],
    router: router,
    });
    this.map.addControl(routingControl);
    //routingControl.setWaypoints(waypoints); 
    }
    
  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
        this.emergencia = nota;
        console.log('pos')
        console.log(this.emergencia)
    });
}

}

