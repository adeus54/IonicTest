import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Estado} from './../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  estados: Estado[];
  URL_API = 'http://127.0.0.1:8000/estados/';

  constructor(
    private http: HttpClient,
  
  ) { }

  getAllEstados(): Observable<any> {
    const path = `${this.URL_API}`;
    return this.http.get<[Estado]>(path);
  }
  
  getOneEstado(id): Observable<any> {
    console.log('estadoId:', id);
    return this.http.get(this.URL_API + id + '/');
  }

}
