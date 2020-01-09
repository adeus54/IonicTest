import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ficha-emergencia',
  templateUrl: './ficha-emergencia.page.html',
  styleUrls: ['./ficha-emergencia.page.scss'],
})
export class FichaEmergenciaPage implements OnInit {

  emergencias: Observable<Emergencia[]>;

  constructor(
    private emergenciaService: EmergenciaService) { }

  ngOnInit() {
    this.getEmergencias();
  }

  // getEmergencias() {
  //     this.emergencias = this.emergenciaService.getAllEmergencias();
  //     console.log(this.emergencias);
  // }

  getEmergencias() {
    this.emergencias = this.emergenciaService.getAllEmergencias();
  }

  


}
