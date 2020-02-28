import { Component, OnInit } from '@angular/core';
import { RetroalimentacionService } from '../../services/retroalimentacion.service';
import { Emergencia } from './../../interfaces/emergencia';
import { User } from './../../interfaces/user';
import { EmergenciaService } from './../../services/emergencia.service';
import { UsuarioService } from './../../services/usuario.service'
import { RetroalimentacionEmergencia } from '../../interfaces/retroalimentacion-emergencia';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-retroalimentacion',
  templateUrl: './retroalimentacion.page.html',
  styleUrls: ['./retroalimentacion.page.scss'],
})
export class RetroalimentacionPage implements OnInit {


  public user: User = {};
  public emergencia: Emergencia = {};
  public retroalimentacion: RetroalimentacionEmergencia = {};
  id;
  idUsuario;

  username: any;


  constructor(
    private retroalimentacionService: RetroalimentacionService,
    private emergenciaService: EmergenciaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    public storage: Storage
  ) { }

  ngOnInit() {
    const idEmergencia = this.route.snapshot.params['id'];
    this.getDetalles(idEmergencia);

    // const idUsuario = this.route.snapshot.params['id'];
    this.getUsername();
    this.getIdUsuario();
    // this.idUsuario = this.authorizationService.obtenerIdUsuario();
  }


  getDetalles(idEmergencia: string): void {
    this.emergenciaService.getOneEmergencia(idEmergencia).subscribe(nota => {
      this.emergencia = nota;
    });
  }

  getUsername() {
    this.username = this.authorizationService.obtenerUsername();
  }

  getIdUsuario() {
    this.id = this.authorizationService.obtenerIdUsuario();
  }


  //Devuelve datos de usuario por id
  getUsuario(idUsuario: string) {
    this.usuarioService.getOneUsuario(this.id)
      .subscribe(user => {
        console.log(user)
      });
  }

  //Guardar Retroalimentacion
  creaRetroalimentacion() {
    const retroalimentacion = {

      emergencia: '2',
      usuario: '1',
      estado: '2',
      Descripcion: 'por fin',
      // fecha: 'Feb-22-2020',
      // hora: '03:09:45.281654'
    };
    this.retroalimentacionService.creaRetroalimentacion(retroalimentacion)
      .subscribe((nuevaRetroalimentacion) => {
        console.log(nuevaRetroalimentacion);
        console.log('se guardo')
      });
  }

  //fecha y hora del sistema
  today = Date.now();

  // token() {
  //   const token = this.retroalimentacionService.obtenerToken()
  //   console.log(token);
  // }



}
