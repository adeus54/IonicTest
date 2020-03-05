import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'home', 
    // canActivate: [AuthGuardService], 
    loadChildren: './pages/home/home.module#HomePageModule' }, 
  { path: 'ficha-emergencia/:id', loadChildren: './pages/ficha-emergencia/ficha-emergencia.module#FichaEmergenciaPageModule' },
  { path: 'retroalimentacion/:id', loadChildren: './pages/retroalimentacion/retroalimentacion.module#RetroalimentacionPageModule' },
  { path: 'mapa/:id', loadChildren: './pages/mapa/mapa.module#MapaPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
