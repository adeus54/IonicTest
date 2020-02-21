import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { Emergencia } from './../../interfaces/emergencia';
import { EmergenciaService } from './../../services/emergencia.service';
import { RetroalimentacionEmergencia } from '../../interfaces/retroalimentacion-emergencia';
import {ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/tareas';

@Component({
  selector: 'app-retroalimentacion',
  templateUrl: './retroalimentacion.page.html',
  styleUrls: ['./retroalimentacion.page.scss'],
})
export class RetroalimentacionPage implements OnInit {

  descripcion: string = "";


  public emergencia: Emergencia = {};
  public retroalimentacion: RetroalimentacionEmergencia = {};
  public tarea: Task;

  constructor(
    private retroalimentacionService: RetroalimentacionService,
    private emergenciaService: EmergenciaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(idEmergencia);
  }


  getDetalles(idEmergencia: string):void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe( nota => {
      this.emergencia = nota;
    });
  }

  creaRetroalimentacion(){
    const retroalimentacion = {

    idEmergencia: '4',
    usuario: 'Carlos',
    estado: 'En Camino',
    descripcion: 'Hola',
        //  fecha: '12/13/14',
        //  hora: '12:12:12',
    };
    this.retroalimentacionService.creaRetroalimentacion(retroalimentacion)
      .subscribe((nuevaRetroalimentacion) => {
        console.log(nuevaRetroalimentacion);
      });

    // console.log('ok')
  }

  createTask() {
    const task = {
      userId: '1',
      title: 'change title',
      completed: true
    };
    this.retroalimentacionService.createTask(task)
    .subscribe((newTask) => {
      console.log(newTask);
    });
  }

  

}
