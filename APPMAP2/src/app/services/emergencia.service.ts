import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { } from '../interfaces/emergencia';

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  constructor(
    private http: HttpClient
  ) { }
}
