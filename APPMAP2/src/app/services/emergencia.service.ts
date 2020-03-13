import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emergencia } from '../interfaces/emergencia';
import { Observable } from 'rxjs';
import { Assignation } from '../interfaces/asignacion';
import { Storage } from '@ionic/storage';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  emergencias: Emergencia[];
  URL_API = 'http://127.0.0.1:8000/fichaemergencias';
  URL_API2 = 'http://127.0.0.1:8000/asignacionemergencia';
  assignation: Assignation[];
  token;

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
    private storage: Storage
  ) {
  }

  async getobtenerToken() {
    await this.storage.get('token').then(rest => {
      console.log('TokenEstadosRest:', rest);
      this.getAllAssignationEmergency(rest).subscribe(data => {
        console.log("ReservaFormComponent -> getobtenerToken -> data", data)
      })
    })
  }

  //Una emergencia
  getOneEmergencia(id): Observable<any> {
    return this.http.get(this.URL_API + '/' + id + '/');
  }

  //Asignaciones de Emergencia
  getAllAssignationEmergency(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + token,
    });
    const path = `${this.URL_API2}`;
    return this.http.get<Assignation[]>(path, { headers: headers });
  }
}