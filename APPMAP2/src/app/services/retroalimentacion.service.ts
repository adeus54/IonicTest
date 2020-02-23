import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetroalimentacionEmergencia } from '../interfaces/retroalimentacion-emergencia';
import { Observable, } from 'rxjs';
import { Task } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionService {

  retroalimentaciones: RetroalimentacionEmergencia[];
  URL_API = 'http://127.0.0.1:8000/retroalimentaciones/';



  constructor(
    private http: HttpClient
  ) { }


  creaRetroalimentacion(retroalimentacion: RetroalimentacionEmergencia) {
    let params = JSON.stringify(retroalimentacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let headers2 =  new HttpHeaders().set('Authorization', 'token')
    const path = `${this.URL_API}`;
    return this.http.post(path, params, { headers: headers});
  }

  // creaRetroalimentacion(retroalimentacion: Object): Observable<object> {
  //   return this.http.post(`${this.URL_API}/`, retroalimentacion);
  // }
 
  createTask(task: Task) {
    const path = `${this.URL_API}/todos`;
    return this.http.post(path, task);
  }

}
