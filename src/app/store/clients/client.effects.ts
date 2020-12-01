import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as fromClientActions from './client.actions';
import { ClientService } from './services/client.service';

@Injectable()
export class ClientEffects {
  fetchClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromClientActions.fetch_clients),
      switchMap(() => {
        return this.clientService.fetchClient();
      }),
      map((clients) => {
        return fromClientActions.set_clients({ clients: clients });
      }),
    );
  });

  constructor(private actions$: Actions, private clientService: ClientService) {}
}
