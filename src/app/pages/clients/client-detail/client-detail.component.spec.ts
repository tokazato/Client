import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailComponent } from './client-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientsRoutingModule } from '../clients-routing.module';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      pipe: () => {
        return {
          subscribe: (): any => {
            return {
              clientNumber: '999999999999999',
              clientName: 'Salome',
              clientSurname: 'Ivanishvili',
              clientGender: 'female',
              clientPersonalNumber: '25454545544',
              clientMobileNumber: '555555555',
              clientImage:
                'https://icons-for-free.com/iconfiles/png/512/child+female+girl+kid+user+young+icon-1320196265224558260.png',
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
              id: 4,
            };
          },
        };
      },
    },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        RouterTestingModule,
        ClientsRoutingModule,
        TableModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    spyOn(component, 'registerClientSubs').and.returnValue();

    component.client = {
      clientNumber: '999999999999999',
      clientName: 'Salome',
      clientSurname: 'Ivanishvili',
      clientGender: 'female',
      clientPersonalNumber: '25454545544',
      clientMobileNumber: '555555555',
      clientImage:
        'https://icons-for-free.com/iconfiles/png/512/child+female+girl+kid+user+young+icon-1320196265224558260.png',
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
      id: 4,
    };

    fixture.detectChanges();
  });

  it('Should create component without throwing error', () => {
    expect(component).toBeTruthy();
  });
});
