import { Estado } from './../../interfaces/estado';
import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { Emergencia } from './../../interfaces/emergencia';
import { User } from './../../interfaces/user';
import { EmergenciaService } from './../../services/emergencia.service';
import { RetroalimentacionEmergencia } from '../../interfaces/retroalimentacion-emergencia';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service'
import { Storage } from '@ionic/storage';
import { EstadosService } from './../../services/estados.service';


@Component({
  selector: 'app-retroalimentacion',
  templateUrl: './retroalimentacion.page.html',
  styleUrls: ['./retroalimentacion.page.scss'],
})
export class RetroalimentacionPage implements OnInit {


  public user: User = {};
  estados: Observable<Estado[]>;
  public emergencia: Emergencia = {};
  public retroalimentacion: RetroalimentacionEmergencia = {};
  id: any;
  idUsuario;
  idEstado;
  idEmergencia: string;
  username: any;
  selectedVal: Number = 0;
  descripcion: string ="";

  constructor(
    private retroalimentacionService: RetroalimentacionService,
    private emergenciaService: EmergenciaService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    public storage: Storage,
    private estadosService:  EstadosService
  ) { }

  ngOnInit() {
    this.idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(this.idEmergencia);
    this.getUsername();
    this.getIdUsuario();
    this.getEstados();
  }

  //Detalles de emergencia por id
  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
      this.emergencia = nota;
    });
  }

  //Obtener todos los estados
  getEstados(){
    this.estados = this.estadosService.getAllEstados();
  }

  //Obtener idEstado
  getIdEstado(event){
    this.idEstado = event.target.value;
   console.log('idEstado:', this.idEstado);
  }

  //Obtener nombre usuario
  getUsername() {
    this.username =  this.authorizationService.obtenerUsername();
  }

  //Obtener idUsuario
  getIdUsuario(){
    this.authorizationService.obtenerIdUsuario().then(rest => {
      this.idUsuario = rest;
      console.log('IdProsd:', this.idUsuario)
    });
  }

  //Guardar Retroalimentacion
  creaRetroalimentacion() {
    const retroalimentacion = {
      emergencia: this.idEmergencia,
      usuario: this.idUsuario,
      estado: this.idEstado,
      Descripcion: this.descripcion,
    };
    this.retroalimentacionService.creaRetroalimentacion(retroalimentacion)
      .subscribe((nuevaRetroalimentacion) => {
        console.log(nuevaRetroalimentacion);
        console.log('se guardo')
      });
    this.descripcion = "";
  }

  //fecha y hora del sistema
  today = Date.now();
}
