import { Component, OnInit,} from '@angular/core';
import { EmergenciaService } from '../../services/emergencia.service';
import { Emergencia } from '../../interfaces/emergencia';
import { Observable } from 'rxjs';
import { AuthorizationService} from '../../services/authorization.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

    private nombre: string;
    
    emergencias: Observable<Emergencia[]>;
    selectedMovie;

  constructor(
    private emergenciaService: EmergenciaService,
    private authorizationService: AuthorizationService
  ) { }

    ngOnInit() {
      this.getEmergencias();
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

    logout(){
      this.authorizationService.logOutUser();
    }

    nombreUsuario(){
      this.nombre= this.authorizationService.obtenerNombreUsuario() + " ";
    }
}
