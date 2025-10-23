import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list';
import { Monster } from './pages/monster/monster';
import { NotFound } from './pages/not-found/not-found';
import { LoginComponent } from './pages/login/login';
import { isLoggedInGuard } from './guards/is-logged-in/is-logged-in-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MonsterListComponent,
  },
  {
    path: 'monster',
    children: [
      {
        path: '',
        component: Monster,
        canActivate: [isLoggedInGuard],
      },
      {
        path: ':id',
        component: Monster,
        canActivate: [isLoggedInGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFound,
  },
];
