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
    private authorizationService:AuthorizationService,
    private storage: Storage
  ) {
  }

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
/*
async getobtenerToken() {
   await this.storage.get('token').then(rest => {
      this.getAllAssignationEmergency(rest).subscribe(data =>{
      });
    });
  }*/
  getAllAssignationEmergency(){
    this.token=localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token '+this.token,
    });
    const path = `${this.URL_API2}`;
    return this.http.get<Assignation[]>(path,{headers: headers});
  }
  // getEmergencia(id: string): Observable<object> {
  //   return this.http.get(`${this.URL_API}/${id}`);
  // }
}
