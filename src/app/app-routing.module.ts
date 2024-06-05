import { NgModule } from '@angular/core';
import { type LoadChildrenCallback, RouterModule, type Routes } from '@angular/router';
import { Urn } from './shared-module/enums/urn.enum';

const loadChildrenCallback: LoadChildrenCallback = () => import('./public-module/public.module').then(m => m.PublicModule);

const routes: Routes = [
  {
    path: Urn.HOME,
    loadChildren: loadChildrenCallback
  },
  {
    path: Urn.SIGN_IN,
    loadChildren: loadChildrenCallback
  },
  {
    path: Urn.PAGE_NOT_FOUND,
    loadChildren: loadChildrenCallback
  },
  {
    path: Urn.REGISTER,
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
