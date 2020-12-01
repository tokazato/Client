import { ActionReducerMap } from '@ngrx/store';

import { StoreState } from './store.state';
import { ClientReducer } from './clients/client.reducer';

export const storeReducers: ActionReducerMap<StoreState> = {
  clients: ClientReducer,
};
