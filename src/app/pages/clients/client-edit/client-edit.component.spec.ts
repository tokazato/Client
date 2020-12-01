import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditComponent } from './client-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientsRoutingModule } from '../clients-routing.module';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('ClientEditComponent', () => {
  let component: ClientEditComponent;
  let fixture: ComponentFixture<ClientEditComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
    params: {
      subscribe: () => {},
    },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEditComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        ClientsRoutingModule,
        HttpClientModule,
        TableModule,
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component without throwing error', () => {
    expect(component).toBeTruthy();
  });
});
