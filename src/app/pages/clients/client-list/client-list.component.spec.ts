import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientsRoutingModule } from '../clients-routing.module';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { Actions } from '@ngrx/effects';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      data: {},
      paramMap: {
        get: (val: string) => {
          return 'TEST';
        },
      },
    },
    queryParams: {
      subscribe: () => {},
    },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
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
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, Actions],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    spyOn(component, 'registerClientSubscription');
    fixture.detectChanges();
  });

  it('Should create component without throwing error', () => {
    expect(component).toBeTruthy();
  });
});
