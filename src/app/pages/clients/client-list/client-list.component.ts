import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { Client } from 'src/app/store/clients/models/client.model';
import { selectClients } from 'src/app/store/clients/client.selector';
import { fetch_clients } from 'src/app/store/clients/client.actions';
import { ClientService } from 'src/app/store/clients/services/client.service';

import * as fromClientsActions from '../../../store/clients/client.actions';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit, OnDestroy {
  clientSubs$: Subscription;

  isLoader = false;
  clients: Client[];
  isPromptShow = false;
  removeClientId = null;

  constructor(
    private store: Store,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private actions: Actions,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchClients();

    this.clientSubs$ = this.actions
      .pipe(ofType(fromClientsActions.set_clients), take(1))
      .subscribe(() => {
        this.registerClientSubscription();
      });
  }

  fetchClients() {
    this.store.dispatch(fetch_clients());
  }

  registerClientSubscription() {
    this.clientSubs$ = this.store
      .pipe(
        select(selectClients),
        map((clients) => clients.clients),
      )
      .subscribe((clients: Client[]) => {
        // clients.map is required in order to make a clone of the original
        // array and make the sorting functionality work in the <p-table />
        this.clients = clients.map((client) => client);

        this.cd.detectChanges();
      });
  }

  promptEvent(isAccept: boolean) {
    if (isAccept) {
      this.isLoader = true;
      this.isPromptShow = false;
      this.clientSubs$ = this.clientService
        .deleteClient(this.removeClientId)
        .pipe(catchError(this.handleError))
        .subscribe(
          () => {
            this.isLoader = false;
            this.store.dispatch(fromClientsActions.delete_clients({ index: this.removeClientId }));
          },
          (err) => {
            alert(err.statusText);
            this.isLoader = false;
            console.log(err);
          },
        );
    } else {
      this.isPromptShow = false;
    }
  }

  delete(client: Client) {
    this.isPromptShow = true;
    this.removeClientId = client.id;
  }

  handleError(error: HttpErrorResponse) {
    this.isLoader = false;
    console.log(error);
    return throwError(error);
  }

  clearClientSubscription() {
    if (this.clientSubs$) {
      this.clientSubs$.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.clearClientSubscription();
  }
}
