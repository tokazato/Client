import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientResolverService } from './clients-resolver.service';
import { ClientsComponent } from './clients.component';
import { ClientsGuard } from './clients.guard';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientNewAccountComponent } from './client-new-account/client-new-account.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    // canActivate: [ClientsGuard],
    children: [
      { path: '', component: ClientListComponent },
      { path: 'new', component: ClientEditComponent },
      {
        path: ':id',
        component: ClientDetailComponent,
        resolve: [ClientResolverService],
      },
      {
        path: ':id/edit',
        component: ClientEditComponent,
        resolve: [ClientResolverService],
      },
      {
        path: ':id/new-account',
        component: ClientNewAccountComponent,
        resolve: [ClientResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
