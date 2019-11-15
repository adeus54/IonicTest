import { Component, OnInit } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from 'src/app/interfaces/emergencia';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.page.html',
  styleUrls: ['./emergencia.page.scss'],
})
export class EmergenciaPage implements OnInit {

  constructor(
    private emergenciaservice: EmergenciaService
  ) { }

  ngOnInit() {
  }

}
