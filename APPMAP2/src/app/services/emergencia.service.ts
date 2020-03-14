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
  token;

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
    private storage: Storage
  ) {
    this.getobtenerToken();
  }

 
  getobtenerToken() {
    this.authorizationService.obtenerToken().then(rest=> {
      this.token = rest;
    });
  }

  //Una emergencia
  getOneEmergencia(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + this.token,
    });
    // const path = `${this.URL_API}`;
    return this.http.get(this.URL_API + '/' + id + '/', {headers});
  }
}