import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Client } from 'src/app/store/clients/models/client.model';
import { selectClients } from 'src/app/store/clients/client.selector';
import { ClientService } from 'src/app/store/clients/services/client.service';
import * as fromClientsActions from '../../../store/clients/client.actions';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  clientSub$: Subscription;

  client: Client;
  clientId: number;
  isPromptShow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.registerClientSubs();
  }

  registerClientSubs(): void {
    this.clientSub$ = this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.clientId = id;
          return this.store.pipe(select(selectClients));
        }),
        map((clientState) => {
          return clientState.clients.find((client, index) => {
            return client.id === this.clientId;
          });
        }),
        take(1),
      )
      .subscribe((selectedclient) => {
        if (selectedclient) {
          this.client = selectedclient;
        } else {
          this.router.navigate(['/clients/new']);
        }
      });
  }

  onEditclient() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteclient() {
    this.isPromptShow = true;
  }

  promptEvent(isAccept: boolean) {
    if (isAccept) {
      this.clientSub$ = this.clientService.deleteClient(this.clientId).subscribe(() => {
        this.store.dispatch(fromClientsActions.delete_clients({ index: this.clientId }));
        this.router.navigate(['/clients']);
      });
      this.isPromptShow = false;
    } else {
      this.isPromptShow = false;
    }
  }

  clearClientSubscription() {
    this.clientSub$.unsubscribe();
  }

  ngOnDestroy() {
    this.clearClientSubscription();
  }
}
