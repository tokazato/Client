import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

import { TableModule } from 'primeng/table';
import { ClientAccountsComponent } from './client-detail/client-accounts/client-accounts.component';
import { ClientNewAccountComponent } from './client-new-account/client-new-account.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientEditComponent,
    ClientAccountsComponent,
    ClientNewAccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ClientsRoutingModule,
    TableModule,
    ComponentsModule,
  ],
})
export class ClientsModule {}
