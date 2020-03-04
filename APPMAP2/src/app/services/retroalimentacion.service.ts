import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetroalimentacionEmergencia } from '../interfaces/retroalimentacion-emergencia';
import { Observable, } from 'rxjs';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionService {

  retroalimentaciones: RetroalimentacionEmergencia[];

  URL_API = 'http://127.0.0.1:8000/retroalimentaciones/';



  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }


  obtenerToken(){
    return localStorage.getItem('token')
  }

  creaRetroalimentacion(retroalimentacion: RetroalimentacionEmergencia) {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + token,
    });
    let params = JSON.stringify(retroalimentacion); 
   
    const path = `${this.URL_API}`;
    return this.http.post(path, params, { headers: headers});
  }

  // creaRetroalimentacion(retroalimentacion: Object): Observable<object> {
  //   return this.http.post(`${this.URL_API}/`, retroalimentacion);
  // }


}
