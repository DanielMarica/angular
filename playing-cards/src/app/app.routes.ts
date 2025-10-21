import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list';
import { Monster } from './pages/monster/monster';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MonsterListComponent
    },
    {
        path: 'monster',
        children: [
            {
                path: '',
                component: Monster
            },
            {
                path: ':id',
                component: Monster
            }
        ]
    },
    {
        path: '**',
        component: NotFound
    }
];