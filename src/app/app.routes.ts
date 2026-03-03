import { Routes } from '@angular/router';
import { RutinasComponent } from './pages/rutinas/rutinas.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { RutinaDetalleComponent } from './pages/rutina-detalle/rutina-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'rutinas', pathMatch: 'full' },
  { path: 'rutinas', component: RutinasComponent },
  { path: 'rutinas/:id', component: RutinaDetalleComponent },
  { path: 'ejercicios', component: EjerciciosComponent },
  { path: '**', redirectTo: 'rutinas' }
];