import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'temas',
<<<<<<< HEAD
    loadChildren: () => import('./temas/temas.routes').then(m => m.TEMAS_ROUTES),
  },
  {
    path: 'aprendices',
    loadChildren: () => import('./aprendices/aprendices.routes').then(m => m.APRENDICES_ROUTES),
  },
  {
    path: 'asignaciones',
    loadChildren: () => import('./tema-aprendiz/tema-aprendiz.routes').then(m => m.TEMA_APRENDIZ_ROUTES),
=======
    loadChildren: () =>
      import('./temas/temas.routes').then((m) => m.TEMAS_ROUTES),
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
  },
  { path: '', redirectTo: 'temas', pathMatch: 'full' },
];
