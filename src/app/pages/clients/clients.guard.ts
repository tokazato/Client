import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { selectClients } from '../../store/clients/client.selector';

@Injectable({ providedIn: 'root' })
export class ClientsGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.store.pipe(
      select(selectClients),
      take(1),
      map((clients) => {
        return clients.clients;
      }),
      map((clients) => {
        const clnt = clients.length === 0 ? false : true;
        if (clnt) {
          return true;
        }
        return this.router.createUrlTree(['']); // type route
      }),
    );
  }
}
