import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MijuegoComponent } from './componentes/mijuego/mijuego.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quiensoy', component: QuiensoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'juegos', component: JuegosComponent },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./componentes/preguntados/preguntados.component').then(
        (x) => x.PreguntadosComponent
      ),
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./componentes/ahorcado/ahorcado.component').then(
        (x) => x.AhorcadoComponent
      ),
  },
  {
    path: 'mayormenor',
    loadComponent: () =>
      import('./componentes/mayoromenor/mayoromenor.component').then(
        (x) => x.MayoromenorComponent
      ),
  },
  {
    path: 'listados',
    component: ListadosComponent,
  },
  {
    path: 'encuesta',
    component: EncuestaComponent,
  },
  { path: 'mijuego', component: MijuegoComponent },
  { path: '**', component: HomeComponent },
];
