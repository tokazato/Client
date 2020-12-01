import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { selectClients } from 'src/app/store/clients/client.selector';
import { Account } from 'src/app/store/clients/models/account.model';
import { AccountService } from '../../../../../app/store/clients/services/account.services';
import { Client } from 'src/app/store/clients/models/client.model';

@Component({
  selector: 'app-client-accounts',
  templateUrl: './client-accounts.component.html',
  styleUrls: ['./client-accounts.component.scss'],
})
export class ClientAccountsComponent implements OnInit, OnDestroy {
  accountSub$: Subscription;

  clientId: number;
  accounts: Account[];
  client: Client;

  constructor(
    private accountService: AccountService,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('id');

    this.accountSub$ = this.store
      .pipe(
        select(selectClients),
        take(1),
        map((clientState) => {
          if (clientState) {
            return clientState.clients.find((item) => {
              return item.id === this.clientId;
            });
          }

          return null;
        }),
      )
      .subscribe((client) => {
        this.client = client;
        this.getClientAccount();
      });
  }

  getClientAccount() {
    if (this.client) {
      this.accountSub$ = this.accountService
        .getAccounts(`${this.client.clientNumber}`)
        .subscribe((res) => {
          this.accounts = res;
        });
    }
  }

  closeAccount(account) {
    const updateAccount: Account = {
      clientNumber: account.clientNumber,
      accountCurrency: account.accountCurrency,
      accountNumber: account.accountNumber,
      accountStatus: 'Closed',
      accountType: account.accountType,
    };
    this.accountSub$ = this.accountService
      .updateAcoount(updateAccount, account.id)
      .subscribe(() => {
        this.getClientAccount();
      });
  }

  clearAccountSubscription() {
    if (this.accountSub$) {
      this.accountSub$.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.clearAccountSubscription();
  }
}
