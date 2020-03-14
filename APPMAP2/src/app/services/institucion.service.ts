import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institucion } from './../interfaces/institucion';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  instituciones: Institucion[];
  URL_API = 'http://127.0.0.1:8000/institucion/';
  token;

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
    private storage: Storage,
  ) {
      this.getobtenerToken();
  }

  //Obtener token
  getobtenerToken() {
    this.authorizationService.obtenerToken().then(rest=> {
      this.token = rest;
    });
  }
  //Obtener Institucion

  getOneInstitucion(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token,
    });
  
    const path = `${this.URL_API}`;
    return this.http.get(path + id + '/', {headers:headers});
  }
}


