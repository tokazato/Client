import { createAction, props } from '@ngrx/store';

import { Client } from './models/client.model';

export const fetch_clients = createAction('[CLIENTS] Fetch Clients');

export const set_clients = createAction('[CLIENTS] Set Clients', props<{ clients: Client[] }>());

export const add_clients = createAction('[CLIENTS] Add Clients', props<{ client: Client }>());

export const update_clients = createAction('[CLIENTS] Update Clients', props<{ client: Client }>());

export const delete_clients = createAction('[CLIENTS] Delete Clients', props<{ index: number }>());
