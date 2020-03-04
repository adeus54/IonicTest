import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetroalimentacionEmergencia } from '../interfaces/retroalimentacion-emergencia';
import { Observable, } from 'rxjs';
import { Storage } from '@ionic/storage'
import { AuthorizationService } from '../services/authorization.service';
import { Institucion } from './../interfaces/institucion';

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionService {

  retroalimentaciones: RetroalimentacionEmergencia[];

  instituciones: Institucion[];
  
  URL_API = 'http://127.0.0.1:8000/retroalimentaciones/';
  
  // URL_API_Insti = 'http://127.0.0.1:8000/institucion/';

  token;
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private authorizationService: AuthorizationService
  ) { }
  

  getobtenerToken() {
    return this.storage.get('token').then(rest => {
      console.log('TokenRESE:',rest)
      this.token = rest;
    })
  }

  creaRetroalimentacion(retroalimentacion: RetroalimentacionEmergencia) {
    console.log('resetoken', this.token)
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token,
    });
    let params = JSON.stringify(retroalimentacion); 
   
    const path = `${this.URL_API}`;
    return this.http.post(path, params, { headers: headers});
  }

   // getIdUsuario(){
  //   this.authorizationService.obtenerIdUsuario().then(rest => {
  //     this.idUsuario = rest;
  //     console.log('IdProsd:', this.idUsuario)
  //   });
  // }

  // getOneInstitucion(id): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'token ' + this.token
  //   });
  //   // let params = JSON.stringify(retroalimentacion); 
   
  //   const path = `${this.URL_API_Insti}`;
  //   return this.http.get(path + id + '/', { headers: headers});
  //   // return this.http.get(path + id + '/');
  // }

  // creaRetroalimentacion(retroalimentacion: Object): Observable<object> {
  //   return this.http.post(`${this.URL_API}/`, retroalimentacion);
  // }


}
