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
    v2;

    items: any[]=[];

  constructor(
    private emergenciaService: EmergenciaService,
    private institucionService: InstitucionService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

    ngOnInit() {
      this.authorizationService.obtenerToken().then(token => {
        this.getEmergenciasAsignadas(token);
      });
      // this.getEmergenciasAsignadas();
      this.getNombreUsuario();
    }

   

    doRefresh(event){
      setTimeout(()=> {
        this.authorizationService.obtenerToken().then(token => {
          this.getEmergenciasAsignadas(token);
          // this.getEmergenciasAsignadas();
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

    // getUsername() {
    //   this.username = this.authorizationService.obtenerUsername();
    // }
    getNombreUsuario(){
      this.authorizationService.obtenerNombreUsuario().then(
        data => {
          this.nombre=data;
        }
      )
    }
    
    ionViewDidEnter() {
        this.getNombreUsuario();
    }
  
    getEmergenciasAsignadas(token) {
      this.emergenciaService.getAllAssignationEmergency(token).subscribe(data => {
        this.asignaciones = data;
        let obj1 = JSON.stringify(this.asignaciones);
        this.v2 = JSON.parse(obj1);
      });
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
      // this.router.navigate(['/login']);
    }

}
