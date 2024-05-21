import { NgModule } from '@angular/core';
import { LoadChildrenCallback, RouterModule, Routes } from '@angular/router';

const loadChildrenCallback: LoadChildrenCallback = () => import('./public/public.module').then(m => m.PublicModule);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: loadChildrenCallback
  },
  {
    path: 'login',
    loadChildren: loadChildrenCallback
  },
  {
    path: 'page-not-found',
    loadChildren: loadChildrenCallback
  },
  {
    path: 'subscribe',
    loadChildren: loadChildrenCallback
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
