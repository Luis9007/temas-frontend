import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'temas',
    loadChildren: () =>
      import('./temas/temas.routes').then((m) => m.TEMAS_ROUTES),
  },
  { path: '', redirectTo: 'temas', pathMatch: 'full' },
];
