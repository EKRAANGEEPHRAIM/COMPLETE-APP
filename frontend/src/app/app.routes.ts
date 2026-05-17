import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
     path:'home',
     loadComponent: () =>  import('./components/sign-in-sign-up-form/sign-in-sign-up-form').then(m => m.SignInSignUpForm)
    },


    {
        path:'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>  import('./components/dashboard/dashboard').then(m => m.Dashboard)
    },

     {
        path : 'update-User',
        
        loadComponent: () =>  import('./components/update-user-form/update-user-form').then(m => m.UpdateUserForm)
     },

     {
        path:'**',
        redirectTo: 'home',
        pathMatch: 'full'
     }

];
