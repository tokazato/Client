import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { TableModule } from 'primeng/table';

import { ClientNewAccountComponent } from './client-new-account.component';
import { ClientsRoutingModule } from '../clients-routing.module';
import { AccountService } from 'src/app/store/clients/services/account.services';

describe('ClientNewAccountComponent', () => {
  let component: ClientNewAccountComponent;
  let fixture: ComponentFixture<ClientNewAccountComponent>;
  let accountService: AccountService;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      subscribe: () => {},
    },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientNewAccountComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        ClientsRoutingModule,
        TableModule,
        HttpClientModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, AccountService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewAccountComponent);
    component = fixture.componentInstance;
    accountService = TestBed.get(AccountService);
    spyOn(component, 'getClientDataFromStore');

    component.selectedClient = {
      clientNumber: '8888888888888888',
      clientName: 'Gvantsa',
      clientSurname: 'Gogoladze',
      clientGender: 'female',
      clientPersonalNumber: '655555555544',
      clientMobileNumber: '555555555',
      clientImage:
        'https://icons-for-free.com/iconfiles/png/512/lady+queen+super+girl+icon-1320166693666560880.png',
      legalAddress: {
        country: 'georgia',
        city: 'tbilisi',
        address: 'mtawminda',
      },
      actualAddress: {
        country: 'georgia',
        city: 'tbilisi',
        address: 'mtawminda',
      },
      id: 5,
    };
    component.clientNumber = '8888888888888888';
    component.formInit();

    fixture.detectChanges();
  });

  it('Should create component without throwing error', () => {
    expect(component).toBeTruthy();
  });

  it('Should call createAccount method, if account doesnt exists', () => {
    const call = {
      accountNumber: '',
      clientNumber: '8888888888888888',
      accountType: null,
      accountCurrency: null,
      accountStatus: null,
    };

    spyOn(accountService, 'checkAccount').and.returnValue(of([]));
    spyOn(accountService, 'createAccount');

    component.saveAccounts();

    expect(accountService.checkAccount).toHaveBeenCalledWith(call);
    expect(component.accountExist).toBeFalsy();
    expect(accountService.createAccount).toHaveBeenCalledWith(call);
  });

  it('Shouldnt call createAccount method, if account exists', () => {
    const call = {
      accountNumber: '',
      clientNumber: '8888888888888888',
      accountType: null,
      accountCurrency: null,
      accountStatus: null,
    };

    spyOn(accountService, 'checkAccount').and.returnValue(of([{ test: 'TEST' }]));
    spyOn(accountService, 'createAccount');

    component.saveAccounts();

    expect(accountService.checkAccount).toHaveBeenCalledWith(call);
    expect(component.accountExist).toBeTruthy();
  });

  it('Should add new account form', () => {
    spyOn(accountService, 'checkAccount').and.returnValue(of([]));
    spyOn(accountService, 'createAccount');

    component.addNewAccountForm();

    expect(component.clientAccountForm.value).toEqual({
      accounts: [
        {
          accountCurrency: null,
          accountNumber: '',
          accountStatus: null,
          accountType: null,
          clientNumber: '8888888888888888',
        },
        {
          accountCurrency: null,
          accountNumber: '',
          accountStatus: null,
          accountType: null,
          clientNumber: '8888888888888888',
        },
      ],
    });
  });
});
