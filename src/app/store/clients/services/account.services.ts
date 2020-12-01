import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Config } from 'src/app/config/config';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(clientnumber) {
    const params = new HttpParams().append('clientNumber', clientnumber.toString());

    return this.http.get<Account[]>(Config.accounts, { params });
  }

  createAccount(account: Account) {
    return this.http.post<Account>(Config.accounts, account);
  }

  updateAcoount(account: Account, id) {
    return this.http.put<Account>(Config.accounts + `/${id}`, account);
  }

  checkAccount(account) {
    let params = new HttpParams()
      .append('clientNumber', account.clientNumber)
      .append('accountNumber', account.accountNumber)
      .append('accountCurrency', account.accountCurrency)
      .append('accountType', account.accountType);

    return this.http.get<any>(Config.accounts, { params });
  }
}
