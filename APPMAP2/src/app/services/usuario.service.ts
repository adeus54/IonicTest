import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: User[]
  URL_API = 'http://127.0.0.1:8000/usuarios';

  constructor(
    private http: HttpClient,
  ) { }

  getOneUsuario(id: string){
    return this.http.get<User>(this.URL_API + '/' + id + '/');
  }
  // getOneUsuario(id): Observable<any> {
  //   return this.http.get(this.URL_API + '/' + id + '/');
  // }
}
