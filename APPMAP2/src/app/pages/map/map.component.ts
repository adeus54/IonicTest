import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit{
    map: Map;
   
  constructor() { }

    

    ngAfterViewInit() {
        //this.makemap(); 
    }
    ionViewDidEnter() {
        

    }

    makemap() {
        var source = new OSM();
        var layer = new TileLayer();
        var position = fromLonLat([-79.2042236, -3.99313]);
        var view = new View({ center: position, zoom: 6 });
        this.map = new Map({ layers: [layer], view: view });
        this.map.setTarget('map');
        console.log('H');
        layer.setSource(source);
    }



    }

