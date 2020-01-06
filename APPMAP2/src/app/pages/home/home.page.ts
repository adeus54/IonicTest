import { Component, OnInit,} from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Observable } from 'rxjs';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Vector from 'ol/source/Vector';
import LVector from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
    
    emergencias: Observable<Emergencia[]>;
    selectedMovie;

  constructor(
    private emergenciaService: EmergenciaService
  ) { }

    ngOnInit() {
      this.getEmergencias();
    }

    getEmergencias() {
      this.emergencias = this.emergenciaService.getAllEmergencias();
    }

    emergenciaSelected = (emergencia) => {
      console.log(emergencia.id);
      this.emergenciaService.getOneEmergencia(emergencia.id).subscribe(
        data => {
          console.log(data)
          // this.selectedMovie = data;
        },
        error => {
          console.log(error);
        }
      );
    }

    // ionViewDidEnter() {
    //     this.makemap();
    // }
    // makemap() {
    //     var source = new OSM();
    //     var layer = new TileLayer();
    //     var position = fromLonLat([-79.2042236, -3.99313]);
    //     var view = new View({ center: position, zoom: 6 });
    //     this.map = new Map({ layers: [layer], view: view });
    //     console.log('Hello');
    //     this.map.setTarget('map');
    //     layer.setSource(source);
    // }

    
}
