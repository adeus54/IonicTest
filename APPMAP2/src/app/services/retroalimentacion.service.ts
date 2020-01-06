import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RetroalimentacionEmergencia } from '../interfaces/retroalimentacion-emergencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionService {

  retroalimentaciones: RetroalimentacionEmergencia[];
  URL_API = 'http://127.0.0.1:8000/retroalimentacions';


  constructor(
    private http: HttpClient
  ) { }


  creaRetroalimentacion(retroalimentacion: RetroalimentacionEmergencia) {
    const path = `${this.URL_API}/`;
    return this.http.post(path, retroalimentacion);
  }
}
