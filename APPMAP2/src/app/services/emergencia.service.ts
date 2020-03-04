import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emergencia } from '../interfaces/emergencia';
import { Observable } from 'rxjs';
import { Assignation } from '../interfaces/asignacion';

import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  emergencias: Emergencia[];
  URL_API = 'http://127.0.0.1:8000/fichaemergencias';
  URL_API2 = 'http://127.0.0.1:8000/asignacionemergencia';
  assignation: Assignation[];

  constructor(
    private http: HttpClient,
    private authorizationService:AuthorizationService
  ) { }

  //Todas las emergencias
  getAllEmergencias(): Observable<any> {
    const path = `${this.URL_API}/`;
    return this.http.get<Emergencia[]>(path);
  }
  //Una emergencia
  getOneEmergencia(id): Observable<any> {
    console.log('emergenciaId:', id);
    return this.http.get(this.URL_API + '/' + id + '/');
  }

  asignacionEmergecia(id): Observable<any> {
    return this.http.get(this.URL_API + '/' + id + '/')
  }
  getAllAssignationEmergency() {
    const token = this.obtenerToken();
    console.log(token+"aquii23");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + token,
    });
    //let params = JSON.stringify(retroalimentacion); 
    const path = `${this.URL_API2}/`;
  //  return this.http.post(path, params, { headers: headers});
    
    return this.http.get(path,{ headers: headers });
  }
  token;
  obtenerToken() {
    this.authorizationService.obtenerToken().then(res=>{
      this.token=res;
      console.log("emergencia token: "+this.token);
      return this.token;
    });
   // return localStorage.getItem('token');
  }


  // getEmergencia(id: string): Observable<object> {
  //   return this.http.get(`${this.URL_API}/${id}`);
  // }
}
