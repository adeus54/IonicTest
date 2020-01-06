import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { RetroalimentacionEmergencia } from '../../interfaces/retroalimentacion-emergencia';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retroalimentacion',
  templateUrl: './retroalimentacion.page.html',
  styleUrls: ['./retroalimentacion.page.scss'],
})
export class RetroalimentacionPage implements OnInit {

  constructor(
    private retroalimentacionService: RetroalimentacionService
  ) { }

  ngOnInit() {
  }

  // createRetroalimentacion(){
  //   this.retroalimentacionService.creaRetroalimenacion()
  // }

}
