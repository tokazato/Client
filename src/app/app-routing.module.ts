import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageGuard } from './guards/language.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [LanguageGuard],
    children: [],
  },
  {
    path: ':lang',
    canActivate: [LanguageGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
      },
      {
        path: 'page-not-found',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: '/page-not-found',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
