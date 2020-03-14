import { Injectable } from '@angular/core';
import { Assignation } from '../interfaces/asignacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEmergenciaService {

  assignation: Assignation[];
  URL_API = 'http://127.0.0.1:8000/asignacionemergencia';

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  async getobtenerToken() {
    await this.storage.get('token').then(rest => {
      console.log('TokenEstadosRest:', rest);
      this.getAllAssignationEmergency(rest).subscribe(data => {
        console.log("ReservaFormComponent -> getobtenerToken -> data", data)
      });
    });
  }

  getAllAssignationEmergency(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + token,
    });
    const path = `${this.URL_API}`;
    return this.http.get<Assignation[]>(path, { headers: headers });
  }


}
