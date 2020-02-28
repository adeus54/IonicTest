import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ficha-emergencia',
  templateUrl: './ficha-emergencia.page.html',
  styleUrls: ['./ficha-emergencia.page.scss'],
})
export class FichaEmergenciaPage implements OnInit {

  // emergencias: Observable<Emergencia[]>;

  

  public emergencia: Emergencia = {};

  constructor(
    private emergenciaService: EmergenciaService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(idEmergencia);
  }


  //Detalles de todas las emergencias
  getDetalles(idEmergencia: string):void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe( nota => {
      this.emergencia = nota;
    });
  }
}
