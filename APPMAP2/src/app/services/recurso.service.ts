import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recurso } from '../interfaces/recurso';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';


@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  recursos: Recurso[];
  token;
  URL_API = 'http://127.0.0.1:8000/recurso/';

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService,
  ) { 

  }

  getRecurso(id, token):Observable <any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'token ' + token,
    });
    const path = `${this.URL_API}`;
    return this.http.get(path + id + '/', {headers});
  }


}
