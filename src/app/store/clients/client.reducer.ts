import { createReducer, on, Action } from '@ngrx/store';

import * as fromClientsActions from './client.actions';
import { ClientState } from './client.state';

export const initialState: ClientState = {
  clients: [],
};

const reducer = createReducer(
  initialState,
  on(fromClientsActions.set_clients, (state, { clients }) => {
    // const stateClients = [...state.clients];
    // const newClients = clients;
    // const filteredClients = Object.assign(stateClients, newClients);
    return {
      ...state,
      clients: clients,
    };
  }),
  on(fromClientsActions.add_clients, (state, { client }) => ({
    ...state,
    clients: [...state.clients, client],
  })),
  on(fromClientsActions.update_clients, (state, { client }) => {
    const clients = [...state.clients];
    let index = state.clients.findIndex((item) => item.id === client.id);
    clients[index] = client;
    return {
      ...state,
      clients: clients,
    };
  }),
  on(fromClientsActions.delete_clients, (state, { index }) => ({
    ...state,
    clients: state.clients.filter((item, id) => {
      return item.id !== index;
    }),
  })),
);

export function ClientReducer(state: ClientState | undefined, action: Action) {
  return reducer(state, action);
}
