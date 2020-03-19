import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estado } from './../interfaces/estado';


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

  ) {
  }

  //Obtener Token
  async getobtenerToken() {
    await this.storage.get('token').then(rest => {
      console.log('TokenEstadosRest:', rest);
      this.getAllEstados(rest).subscribe(data => {
        console.log("ReservaFormComponent -> getobtenerToken -> data", data)
      });
    });
  }

  //Obtener Estados
  getAllEstados(token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + token
    });
    const path = `${this.URL_API}`;
    return this.http.get<Estado[]>(path, { headers: headers });
  }
}
