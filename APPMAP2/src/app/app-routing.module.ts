import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'emergencia', loadChildren: './pages/emergencia/emergencia.module#EmergenciaPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'ficha-emergencia', loadChildren: './pages/ficha-emergencia/ficha-emergencia.module#FichaEmergenciaPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
