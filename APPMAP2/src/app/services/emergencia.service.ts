import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Emergencia } from '../interfaces/emergencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  emergencias: Emergencia[];
  URL_API = 'http://127.0.0.1:8000/fichaemergencias';


  constructor(
    private http: HttpClient
  ) { }


  getAllEmergencias(): Observable<any> {
    const path = `${this.URL_API}/`;
    return this.http.get<Emergencia[]>(path);
  }

  getOneEmergencia(id): Observable<any> {
    return this.http.get(this.URL_API + '/' + id + '/');
  }

  // getEmergencia(id: string): Observable<object> {
  //   return this.http.get(`${this.URL_API}/${id}`);
  // }
}
