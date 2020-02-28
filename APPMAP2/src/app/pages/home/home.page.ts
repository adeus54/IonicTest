import { Component, OnInit,} from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Observable } from 'rxjs';
import { AuthorizationService} from '../../services/authorization.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

    username: any;
    nombre: any;
    
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
      
      // let nombre = this.authorizationService.obtenerNombreUsuario();
      // this.username = `${nombre}`;

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

    emergenciaSelected = (emergencia) => {
      console.log(emergencia.id);
      this.emergenciaService.getOneEmergencia(emergencia.id).subscribe(
        data => {
          console.log(data)
          // this.selectedMovie = data;
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
