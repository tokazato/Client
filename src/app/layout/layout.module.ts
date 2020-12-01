import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

const COMPONENTS = [LayoutComponent, HeaderComponent];

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ComponentsModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class LayoutModule {}
