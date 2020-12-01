import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientAccountsComponent } from './client-accounts.component';
import { ClientsRoutingModule } from '../../clients-routing.module';
import { StoreModule } from '@ngrx/store';

describe('ClientAccountsComponent', () => {
  let component: ClientAccountsComponent;
  let fixture: ComponentFixture<ClientAccountsComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      data: {},
      paramMap: {
        get: function (val) {
          return 'TEST';
        },
      },
    },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAccountsComponent],
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
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component without throwing error', () => {
    expect(component).toBeTruthy();
  });
});
