import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estado } from './../interfaces/estado';
import { AuthorizationService } from '../services/authorization.service';


@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  estados: Estado[];
  URL_API = 'http://127.0.0.1:8000/estados/';
  token;
  constructor(
    private http: HttpClient,
      private storage: Storage,
    private authorizationService: AuthorizationService,
  ) {
  }

  getOneInstitucion(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token
    });
   
    const path = `${this.URL_API}`;
    return this.http.get(path + id + '/', {headers : headers});
  }
  


  
  getAllEstados(){
    this.token=localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token '+this.token,
    });
    const path = `${this.URL_API}`;
    return this.http.get<Estado[]>(path,{headers: headers});
  }
 
}
