import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estado} from './../interfaces/estado';


@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  estados: Estado[];
  URL_API = 'http://127.0.0.1:8000/estados/';
  token;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  getobtenerToken() {
    return this.storage.get('token').then(rest => {
      console.log('TokenRESE:',rest)
      this.token = rest;
    })
  }

  getOneInstitucion(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token
    });
    // let params = JSON.stringify(retroalimentacion); 
   
    const path = `${this.URL_API}`;
    return this.http.get(path + id + '/', {headers : headers});
    // return this.http.get(path + id + '/' {headers: headders});
  }
  

  getAllEstados(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + this.token
    });
    const path = `${this.URL_API}`;
    return this.http.get<[Estado]>(path);
  }
}
