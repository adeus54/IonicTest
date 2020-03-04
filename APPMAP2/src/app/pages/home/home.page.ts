import { Component, OnInit, MissingTranslationStrategy,} from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Observable } from 'rxjs';
import { AuthorizationService} from '../../services/authorization.service';
import { Router } from '@angular/router';
import { Assignation } from '../../interfaces/asignacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

    username: any;
    nombre: any;
    id: any;
  
    assignation: Assignation[];
    emergencias: Observable<Emergencia[]>;
    selectedMovie;

  constructor(
    private emergenciaService: EmergenciaService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

    ngOnInit() {
      this.getEmergencias();
      this.getNombreUsuario();
      this.getUsername();
      this.getIdUser();
    }
    getIdUser() {
      this.authorizationService.obtenerIdUsuario().then(resp=>{
        this.id = resp;
        this.getEmergenciasAsignadas(this.id);
      });
      
    }

    getUsername() {
      this.username = this.authorizationService.obtenerUsername();
    }

    getNombreUsuario(){
      this.nombre = this.authorizationService.obtenerNombreUsuario();
    }
   
    getEmergencias() {
      this.emergencias = this.emergenciaService.getAllEmergencias();
    }
    getEmergenciasAsignadas(idUser){
      this.emergenciaService.getAllAssignationEmergency().subscribe(data=>{
        const arrayA = data;
        console.log(arrayA);
      });
     // this.emergenciaService.asignacionEmergecia();
    }

    emergenciaSelected = (emergencia) => {
      console.log(emergencia.id);
      this.emergenciaService.getOneEmergencia(emergencia.id).subscribe(
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
