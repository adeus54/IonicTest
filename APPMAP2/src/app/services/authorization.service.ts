import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../interfaces/user";
import { BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  authenticationState = new BehaviorSubject(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  }

  token;
  username;
  id;
  idInst;
  nombre;
  URL_API = 'http://127.0.0.1:8000/login/';
  URL_API_Insti = 'http://127.0.0.1:8000/institucion/';

  constructor(
    private http: HttpClient,
    public storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) 
  {
    
  }

  //Loguearse
  consultarUsuarioIngreso(usuario: User) {
    this.http.post<User>(this.URL_API, usuario, this.httpOptions).subscribe( res => {
      this.iniciarSesionUsuario(res);
      this.presentToast()
      this.router.navigate(['/home']);
      
    }, error => {
      this.errorLogueo();
    });
  }

  //Toast logueo correcto
  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'Usuario Logueado',
      duration: 500
    });
    toast.present();
  }

  //Toast error Logueo
  async errorLogueo() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Usuario o Contraseña Incorrecto',
      duration: 1000
    });
    toast.present();
  }

  //Token obtener
  async obtenerToken() {
    this.token = await this.storage.get('token');
    return this.token;
  }

  //Obtener IdInstitucion
  async obtenerIdInstitucion(){
    this.idInst = await this.storage.get('institucion');
    return this.idInst;
  }

  //Obtener Recurso
  async obtenerIdRecurso(){
    this.idInst = await this.storage.get('recurso');
    return this.idInst;
  }

  //Obtener Id Usuario
  async obtenerIdUsuario() {
    this.id =  await this.storage.get('id_user');
    console.log('idUsuario:', this.id);
    return this.id;
  }

  //Username obtener
  async obtenerUsername(){
    this.username = await this.storage.get('username');
    console.log('username:', this.username);
    return this.username;
  }
  //NombreUsuario obtener
    async obtenerNombreUsuario(){
      this.nombre = await this.storage.get('nombreUsuario');
      return this.nombre
   }

  
  //Loguearse
  loginUser(userData): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL_API, userData);
  }

  //Envia datos de usuario al storage 
  iniciarSesionUsuario(usuario) {
    this.storage.set('token', usuario.token);
    this.storage.set('id_user', usuario.username.id_user);
    this.storage.set('username', usuario.username.username);
    this.storage.set('nombreUsuario', usuario.username.first_name);
    this.storage.set('institucion', usuario.username.institucion);
    this.storage.set('recurso', usuario.username.recurso);
  }

  //Cerrar Sesion de usuario
  cerrarSesionUsuario() {
    this.storage.clear();
    this.storage.remove('institucion');
    this.router.navigate(['/login']);
    this.storage.remove('token');
    this.storage.remove('id_user');
    this.storage.remove('username');
    this.storage.remove('nombreUsuario');
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }
}
