import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { ActivatedRoute, Params } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Assignation } from '../../interfaces/asignacion';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.page.html',
    styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

    map: L.Map;
    actual_lat: number
    actual_lon: number
    destiny_lat: number
    destiny_lon: number
    asignaciones: Assignation[];
    public emergencia: Emergencia = {};
    //public geolocation: Geolocation;

    constructor(private emergenciaService: EmergenciaService,
        private route: ActivatedRoute,
        public geolocation: Geolocation) {
        const idEmergencia = this.route.snapshot.params['id'];
        this.getDetalles(idEmergencia);
    }

    ngOnInit() {

        this.currentPosition();
        // this.getEmergenciasAsignadas();

    }

    // getEmergenciasAsignadas() {
    //     this.emergenciaService.getAllAssignationEmergency().subscribe(data => {
    //         this.asignaciones = data;
    //     });
    // }



    ionViewDidEnter() {

        this.createmap();
        // Marca las posiciones
        this.createDestinyMarker();
        this.createCurrentMarker();
        // trasar ruta
        this.routing();
    }

    ionViewWillLeave() {
        this.map.remove();
    }


    currentPosition() {
        console.log('coordenadas')

        //document.getElementById('map').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
        this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
            //console.log('va a consultar')
            this.actual_lat = geoposition.coords.latitude
            this.actual_lon = geoposition.coords.longitude

            console.log(this.actual_lat, this.actual_lon)
            //console.log('consulto')
        }).catch((error) => {
            console.log('Rise -> Error getting location', error);
        });

    }


    getDetalles(idEmergencia: string): void {
        this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
            this.emergencia = nota;
            this.destiny_lat = this.emergencia.latitud;
            this.destiny_lon = this.emergencia.longitud;
            console.log('Mapa', this.emergencia)
        });

    }


    createmap() {
        if (this.map != undefined) {
            this.map.remove();
            console.log(' func')
        }

        this.map = L.map('map').setView([-3.99313, -79.2042236], 15);
        //L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    }

    createDestinyMarker() {

        var marker = L.marker(L.latLng(this.destiny_lat, this.destiny_lon)).addTo(this.map);

        var information = ('<b>Incidente:</b>' + '<br>' + this.emergencia.titulo + '<br>' +
            '<b>Descripcion:</b>' + '<br>' + this.emergencia.description + '<br>' +
            '<b>Alerta:</b>' + '<br>' + this.emergencia.alerta + '<br>');
        marker.bindPopup(information);

    }

    createCurrentMarker() {
        var myIcon = L.icon({
            iconUrl: 'assets/gps2.png',
            iconSize: [38, 50],
            iconAnchor: [22, 74],

        });

        var marker = L.marker(L.latLng(this.actual_lat, this.actual_lon), { icon: myIcon });
        var information = ('<b>Posicion Actual</b>');
        marker.addTo(this.map).bindPopup(information);

    }

    routing() {
        // ruta del server OSRM propio
        var router = new L.Routing.OSRMv1({ serviceUrl: 'http://0.0.0.0:5000/route/v1' });

        L.Routing.control({
            waypoints: [
                L.latLng(this.actual_lat, this.actual_lon),
                L.latLng(this.destiny_lat, this.destiny_lon)
            ],
            router: router,
            plan: L.Routing.plan([
                L.latLng(this.actual_lat, this.actual_lon),
                L.latLng(this.destiny_lat, this.destiny_lon)
            ], {
                createMarker: function () { return null; },
                routeWhileDragging: false
            }),

        }).addTo(this.map);

    }
}



