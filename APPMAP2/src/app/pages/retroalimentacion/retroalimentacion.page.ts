import { Estado } from './../../interfaces/estado';
import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { Emergencia } from './../../interfaces/emergencia';
import { User } from './../../interfaces/user';
import { Institucion } from './../../interfaces/institucion';
import { Recurso } from './../../interfaces/recurso';
import { EmergenciaService } from './../../services/emergencia.service';
import { InstitucionService } from './../../services/institucion.service';
import { RetroalimentacionEmergencia } from '../../interfaces/retroalimentacion-emergencia';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service'
import { Storage } from '@ionic/storage';
import { EstadosService } from './../../services/estados.service';
import { ToastController } from '@ionic/angular';
import { RecursoService } from '../../services/recurso.service';

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
  descripcion: string = "";
  public institucion: Institucion = {};
  public recurso: Recurso = {};

  constructor(
    private retroalimentacionService: RetroalimentacionService,
    private institucionService: InstitucionService,
    private emergenciaService: EmergenciaService,
    private recursoService: RecursoService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    public storage: Storage,
    private estadosService: EstadosService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    //Obtener el nombre de la institucion
    this.authorizationService.obtenerIdInstitucion().then(rest => {
      this.getInstitucion(rest);
    });

    //Obtener Recurso
    this.authorizationService.obtenerIdRecurso().then(data => {
      this.authorizationService.obtenerToken().then(token => {
        this.getRecurso(data, token);
      });
    });

    //id de la Emergencia
    this.idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(this.idEmergencia);
    this.getUsername();
    this.getIdUsuario();

    //Token
    this.authorizationService.obtenerToken().then(token => {
      this.getEstados(token);
    });
  }

  //Obtiene Institucion
  getInstitucion(idInstitucion: string): void {
    this.institucionService.getOneInstitucion(idInstitucion).subscribe(nota => {
      this.institucion = nota;
    });
  }

  //Obtener Recurso
  getRecurso(idRecurso: string, token: string): void {
    this.recursoService.getRecurso(idRecurso, token).subscribe(rest => {
      this.recurso = rest;
    })
  }

  //Detalles de emergencia por id
  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
      this.emergencia = nota;
      // console.log(this.emergencia);
    });
  }

  //Obtener todos los estados
  getEstados(token) {
    this.estados = this.estadosService.getAllEstados(token);
  }

  //Obtener idEstado al seleccionar
  getIdEstado(event) {
    this.idEstado = event.target.value;
    console.log('idEstado:', this.idEstado);
  }

  //Obtener nombre usuario
  getUsername() {
    this.username = this.authorizationService.obtenerUsername();
  }

  //Obtener idUsuario
  getIdUsuario() {
    this.authorizationService.obtenerIdUsuario().then(rest => {
      this.idUsuario = rest;
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
        this.presentToast();
      },
        error => {
          this.errorToast();
        });
    this.descripcion = "";
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Retroalimetación guardada correctamente',
      duration: 2000
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Llene los campos | No puede guardar el mismo estado!',
      duration: 2000
    });
    toast.present();
  }



  //fecha y hora del sistema
  today = Date.now();
}
