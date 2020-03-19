import { Component, OnInit, MissingTranslationStrategy, } from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Institucion } from '../../interfaces/institucion';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service'
import { InstitucionService } from '../../services/institucion.service';
import { AsignacionEmergenciaService } from '../../services/asignacion-emergencia.service'
import { Assignation } from '../../interfaces/asignacion';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  idInstitucion;
  id;
  username: any;
  nombre: any;
  emergencias: Observable<Emergencia[]>;
  public institucion: Institucion = {};
  asignaciones: Assignation[];
  v2;

  constructor(
    private emergenciaService: EmergenciaService,
    private institucionService: InstitucionService,
    private authorizationService: AuthorizationService,
    private asignacionemergenciaService: AsignacionEmergenciaService,
    private localNotifications: LocalNotifications
  ) { 
    // setInterval(()=> {
    //   this.authorizationService.obtenerToken().then(token => {
    //     this.getEmergenciasAsignadas(token);
    //   });
    // },1000)
  }

  ngOnInit() {
    this.authorizationService.obtenerToken().then(token => {
      this.getEmergenciasAsignadas(token);
    });
    // this.getEmergenciasAsignadas();
    this.getNombreUsuario();
    // this.NoficicacionEmergencia();
    this.localNotifications.schedule({
      title: 'Puede que tengas nuevas emergencias',
      text: 'Ingresa a la aplicacion y revisa tus emergencias',
      trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
    })
    
  }

  // NoficicacionEmergencia(){
  //   this.localNotifications.schedule({
  //     title: 'Puede que tengas nuevas emergencias',
  //     text: 'Ingresa a la aplicacion y revisa tus emergencias',
  //     trigger: {at: new Date(new Date().getTime() + 3600)}
  //   })
  // }
  ionViewWillEnter() {
    this.getNombreUsuario();
    // this.authorizationService.obtenerToken().then(token => {
    //   this.getEmergenciasAsignadas(token);
    // });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.authorizationService.obtenerToken().then(token => {
        this.getEmergenciasAsignadas(token);
      });
      event.target.complete();
    }, 1500);
  }

  getDetalles(idInstitucion: string): void {
    this.institucionService.getOneInstitucion(idInstitucion).subscribe(nota => {
      this.institucion = nota;
      console.log(this.institucion);
    });
  }

  getNombreUsuario() {
    this.authorizationService.obtenerNombreUsuario().then(
      data => {
        this.nombre = data;
      }
    )
  }

  getEmergenciasAsignadas(token) {
    // setInterval(()=> {
      this.asignacionemergenciaService.getAllAssignationEmergency(token).subscribe(data => {
        this.asignaciones = data;
        let obj1 = JSON.stringify(this.asignaciones);
        this.v2 = JSON.parse(obj1);
      });
    // },1000)
  }

  emergenciaSelected = (emergencia) => {
    this.emergenciaService.getOneEmergencia(emergencia).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

  cerrarSesion() {
    this.authorizationService.cerrarSesionUsuario();
  }

}
