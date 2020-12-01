import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { fetch_clients, set_clients } from '../../store/clients/client.actions';
import { Client } from '../../store/clients/models/client.model';
import { selectClients } from '../../store/clients/client.selector';

@Injectable({ providedIn: 'root' })
export class ClientResolverService implements Resolve<Client[]> {
  constructor(private store: Store, private actions$: Actions) {}

  resolve() {
    return this.store.pipe(
      select(selectClients),
      take(1),
      map((clientState) => {
        return clientState.clients;
      }),
      switchMap((clients) => {
        if (clients.length === 0) {
          this.store.dispatch(fetch_clients());
          return this.actions$.pipe(ofType(set_clients.type), take(1));
        } else {
          return of(clients);
        }
      }),
    );
  }
}
