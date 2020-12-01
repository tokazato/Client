import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { selectClients } from 'src/app/store/clients/client.selector';
import { Client } from 'src/app/store/clients/models/client.model';
import { AccountService } from 'src/app/store/clients/services/account.services';
import { Patterns } from 'src/app/utils/format/patterns';

@Component({
  selector: 'app-client-new-account',
  templateUrl: './client-new-account.component.html',
  styleUrls: ['./client-new-account.component.scss'],
})
export class ClientNewAccountComponent implements OnInit, OnDestroy {
  accountSub$: Subscription;

  isLoader: boolean = false;
  clientAccountForm: FormGroup;
  clientId: number;
  clientNumber: string;
  selectedClient: Client;
  accountExist: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.clientId = +param['id'];
      this.getClientDataFromStore();
    });
  }

  saveAccounts() {
    this.isLoader = true;
    this.clientAccountForm.value.accounts.forEach((acc) => {
      this.accountSub$ = this.accountService
        .checkAccount(acc)
        .pipe(catchError(this.handleError))
        .subscribe(
          (res) => {
            if (res && res.length > 0) {
              this.isLoader = false;
              this.accountExist = true;
            } else {
              this.accountSub$ = this.accountService.createAccount(acc).subscribe(
                () => {
                  this.isLoader = false;
                  this.router.navigate(['../'], { relativeTo: this.route });
                },
                (err) => {
                  alert(err.statusText);
                  this.isLoader = false;
                  console.log(err);
                },
              );
            }
          },
          (err) => {
            alert(err.statusText);
            this.isLoader = false;
            console.log(err);
          },
        );
    });
  }

  getClientDataFromStore() {
    this.accountSub$ = this.store
      .pipe(
        select(selectClients),
        take(1),
        map((clientState) => {
          if (clientState) {
            return clientState.clients.find((client) => {
              return client.id === this.clientId;
            });
          }

          return null;
        }),
      )
      .subscribe((client) => {
        if (client) {
          this.selectedClient = client;
          this.clientNumber = client.clientNumber;
          this.formInit();
        } else {
          this.router.navigate(['/clients']);
        }
      });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteClients(index: number) {
    (<FormArray>this.clientAccountForm.get('accounts')).removeAt(index);
  }

  addNewAccountForm() {
    (<FormArray>this.clientAccountForm.get('accounts')).push(
      new FormGroup({
        accountNumber: new FormControl('', Validators.required),
        clientNumber: new FormControl(this.clientNumber, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        accountType: new FormControl(null, Validators.required),
        accountCurrency: new FormControl(null, Validators.required),
        accountStatus: new FormControl(null, Validators.required),
      }),
    );

    console.log(this.clientAccountForm.value);
  }

  formInit() {
    this.clientAccountForm = new FormGroup({
      accounts: new FormArray([
        new FormGroup({
          accountNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(Patterns.number),
          ]),
          clientNumber: new FormControl(this.clientNumber, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
          accountType: new FormControl(null, Validators.required),
          accountCurrency: new FormControl(null, Validators.required),
          accountStatus: new FormControl(null, Validators.required),
        }),
      ]),
    });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoader = false;
    console.log(error);
    return throwError(error);
  }

  clearAccountSubscription() {
    this.accountSub$.unsubscribe();
  }

  ngOnDestroy() {
    this.clearAccountSubscription();
  }
}
