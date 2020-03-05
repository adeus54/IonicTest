import { Estado } from './../../interfaces/estado';
import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { Emergencia } from './../../interfaces/emergencia';
import { User } from './../../interfaces/user';
import {  Institucion } from './../../interfaces/institucion';
import { EmergenciaService } from './../../services/emergencia.service';
import { InstitucionService } from './../../services/institucion.service';
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
  token;
  idEmergencia: string;
  username: any;
  selectedVal: Number = 0;
  descripcion: string ="";
  public institucion: Institucion = {};

  constructor(
    private retroalimentacionService: RetroalimentacionService,
    private institucionService: InstitucionService,
    private emergenciaService: EmergenciaService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    public storage: Storage,
    private estadosService:  EstadosService
  ) { }

  ngOnInit() {
    this.authorizationService.obtenerIdInstitucion().then(rest => {
      console.log('idInstitucion:', rest);
        this.getInstitucion(rest);

    });

    this.retroalimentacionService.getobtenerToken();

    this.idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(this.idEmergencia);
    this.getUsername();
    this.getIdUsuario();
    

    }

    ionViewDidEnter() {

        this.getEstados();
    }

  getInstitucion(idInstitucion: string): void {
    this.institucionService.getOneInstitucion(idInstitucion).subscribe(nota => {
      this.institucion = nota;
      console.log('iDInstRetro:', this.institucion);
      });
  }

  //Detalles de emergencia por id
  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
      this.emergencia = nota;
      // console.log(this.emergencia);
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

  // getToken(){
  //   this.institucionService.getobtenerToken();
  // }
}
