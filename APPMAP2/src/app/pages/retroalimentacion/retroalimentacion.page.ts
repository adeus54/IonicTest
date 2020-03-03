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


  selectedVal: Number = 1;
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

  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
      this.emergencia = nota;
    });
  }

  // getEmergencias() {
  //   this.emergencias = this.emergenciaService.getAllEmergencias();
  // }

  getEstados(){
    this.estados = this.estadosService.getAllEstados();
  }

  getIdEstado(event){
    this.idEstado = event.target.value;
   console.log(this.idEstado);
  }

  estadoSelected = (estado) => {
    console.log(estado.id);
    this.estadosService.getOneEstado(estado.id).subscribe(
      data => {
        console.log(data)
        // this.selectedMovie = data;
      },
      error => {
        console.log(error);
      }
    );  
  }

  //Obtener nombre usuario
  getUsername() {
    this.username =  this.authorizationService.obtenerUsername();
  }

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
      Descripcion: 'por fin',
      // fecha: 'Feb-22-2020',
      // hora: '03:09:45.281654'
    };
    this.retroalimentacionService.creaRetroalimentacion(retroalimentacion)
      .subscribe((nuevaRetroalimentacion) => {
        console.log(nuevaRetroalimentacion);
        console.log('se guardo')
      });
  }

  //fecha y hora del sistema
  today = Date.now();

  // token() {
  //   const token = this.retroalimentacionService.obtenerToken()
  //   console.log(token);
  // }



}
