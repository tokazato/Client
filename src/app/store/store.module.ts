import { NgModule } from '@angular/core';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { storeReducers } from './store.reducers';
import { ClientEffects } from './clients/client.effects';

@NgModule({
  declarations: [],
  imports: [NgRxStoreModule.forRoot(storeReducers), EffectsModule.forRoot([ClientEffects])],
})
export class StoreModule {}
