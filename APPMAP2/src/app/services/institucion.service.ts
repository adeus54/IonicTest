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

  // getobtenerToken() {
  //   return this.storage.get('token').then(rest => {
  //     console.log('TokenRESE:',rest)
  //     this.token = rest;
  //   })
  // }

  getobtenerToken() {
    this.authorizationService.obtenerToken().then(rest=> {
      
      this.token = rest;
      console.log('InitialTokenINSTI:', this.token);
    })
    // return this.storage.get('token').then(rest => {
    //   console.log('TokenRESE:',rest)
    //   this.token = rest;
    // })
    
  }
  

  getOneInstitucion(id): Observable<any> {
    console.log('FinalToken Insti', this.token)
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token,
    });
    // let params = JSON.stringify(retroalimentacion); 
   
    const path = `${this.URL_API}`;
    return this.http.get(path + id + '/', {headers:headers});
    // return this.http.get(path + id + '/' {headers: headders});
  }
  
  
}


