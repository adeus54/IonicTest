import { Component, OnInit, MissingTranslationStrategy,} from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Institucion } from '../../interfaces/institucion';
import { Observable } from 'rxjs';
import { AuthorizationService} from '../../services/authorization.service'
import { InstitucionService } from '../../services/institucion.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Assignation } from '../../interfaces/asignacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

    idInstitucion;
    id;
    username: any;
    nombre: any;
    emergencias: Observable<Emergencia[]>;
    public institucion: Institucion = {};
    asignaciones: Assignation[];
    obj: Assignation[];
  constructor(
    private emergenciaService: EmergenciaService,
    private institucionService: InstitucionService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

    ngOnInit() {

      this.getEmergenciasAsignadas();
      // this.getNombreUsuario();
      // this.getUsername();
      // this.authorizationService.obtenerIdInstitucion().then(rest => {
      //   console.log('idInstitucion:', rest);
      //   this.getDetalles(rest);
      // });
    }

    // getIdInstitucion(){
    //   this.authorizationService.obtenerIdInstitucion().then(rest => {
    //     this.idInstitucion = rest;
    //     console.log('IdInstitucionTS:', this.idInstitucion);
    //   });
    // }

    getDetalles(idInstitucion: string): void {
      this.institucionService.getOneInstitucion(idInstitucion).subscribe(nota => {
        this.institucion = nota;
        console.log(this.institucion);
        });
    }

    getUsername() {
      this.username = this.authorizationService.obtenerUsername();
    }
    

    // getNombreUsuario(){
    //   this.nombre = this.authorizationService.obtenerNombreUsuario();
    // }
   
    getEmergencias() {
      this.emergencias = this.emergenciaService.getAllEmergencias();
    }
    valor:[];
    a;
    v2;
    getEmergenciasAsignadas(){
      this.emergenciaService.getAllAssignationEmergency().subscribe(data=>{
        this.asignaciones=data;
        let contador=this.asignaciones.length;
        let obj1 = JSON.stringify(this.asignaciones);
        this.v2 = JSON.parse(obj1);
        console.log(this.v2);
        /*
        for (let index = 0; index < contador; index++) {
          let obj = JSON.stringify(this.asignaciones[index]);
          let v = JSON.parse(obj);
          this.a=v.emergencia.titulo;
          
          console.log(this.a);
          
        }*/
         
        //let obtener =JSON.stringify(data);
      });
     // this.emergenciaService.asignacionEmergecia();
    }

    emergenciaSelected = (emergencia) => {
      console.log(emergencia);
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
      // this.router.navigate(['/login']);
    }

}
