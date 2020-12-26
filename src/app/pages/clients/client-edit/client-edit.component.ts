import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, map, take } from 'rxjs/operators';

import { selectClients } from 'src/app/store/clients/client.selector';
import { ClientService } from 'src/app/store/clients/services/client.service';
import { Patterns } from '../../../utils/format/patterns';
import { NewClient } from 'src/app/store/clients/models/new-client-request.model';
import * as fromClientsActions from '../../../store/clients/client.actions';
import { Subscription, throwError } from 'rxjs';
import { Client } from 'src/app/store/clients/models/client.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit, OnDestroy {
  clientSub$: Subscription;

  isLoader: boolean = false;
  clientForm: FormGroup;
  index: number;
  editMode: boolean;
  clientId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.clientId = +param['id'];
      this.editMode = !!param['id'];
    });
    this.initForm();
  }

  saveClient() {
    this.buildClientRequest();
  }

  buildClientRequest() {
    const clientRequest: NewClient = {
      clientNumber: this.clientForm.get('clientNumber').value,
      clientName: this.clientForm.get('clientName').value,
      clientSurname: this.clientForm.get('clientSurname').value,
      clientGender: this.clientForm.get('clientGender').value,
      clientPersonalNumber: this.clientForm.get('clientPersonalNumber').value,
      clientMobileNumber: this.clientForm.get('clientMobileNumber').value,
      clientImage: this.clientForm.get('clientImage').value,
      legalAddress: this.clientForm.get('legalAddress').value,
      actualAddress: this.clientForm.get('actualAddress').value,
    };

    if (this.editMode) {
      this.isLoader = true;
      this.clientSub$ = this.clientService
        .updateClient(clientRequest, this.clientId)
        .pipe(catchError(this.handleError))
        .subscribe(
          (client: Client) => {
            this.isLoader = false;
            this.store.dispatch(fromClientsActions.update_clients({ client: client }));
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (err) => {
            alert(err.statusText);
            this.isLoader = false;
            console.log(err);
          },
        );
    } else {
      this.isLoader = true;
      this.clientSub$ = this.clientService
        .addClient(clientRequest)
        .pipe(catchError(this.handleError))
        .subscribe(
          (client: Client) => {
            this.isLoader = false;
            this.store.dispatch(fromClientsActions.add_clients({ client: client }));
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (err) => {
            alert(err.statusText);
            this.isLoader = false;
            console.log(err);
          },
        );
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoader = false;
    console.log(error);
    return throwError(error);
  }

  private initForm() {
    let clientNumber = '';
    let clientName = '';
    let clientSurname = '';
    let clientGender = '';
    let clientPersonalNumber = '';
    let clientMobileNumber = '';
    let clientImage = '';
    let legalAddress = new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    let actualAddress = new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    if (this.editMode) {
      this.clientSub$ = this.store
        .pipe(
          select(selectClients),
          take(1),
          map((clientState) => {
            return clientState.clients.find((item, index) => {
              return item.id === this.clientId;
            });
          }),
        )
        .subscribe((editClient) => {
          if (editClient) {
            this.clientId = editClient.id;
            clientNumber = editClient.clientNumber;
            clientName = editClient.clientName;
            clientSurname = editClient.clientSurname;
            clientGender = editClient.clientGender;
            clientPersonalNumber = editClient.clientPersonalNumber;
            clientMobileNumber = editClient.clientMobileNumber;
            clientImage = editClient.clientImage;
            legalAddress = new FormGroup({
              country: new FormControl(editClient.legalAddress.country, Validators.required),
              city: new FormControl(editClient.legalAddress.city, Validators.required),
              address: new FormControl(editClient.legalAddress.address, Validators.required),
            });
            actualAddress = new FormGroup({
              country: new FormControl(editClient.actualAddress.country, Validators.required),
              city: new FormControl(editClient.actualAddress.city, Validators.required),
              address: new FormControl(editClient.actualAddress.address, Validators.required),
            });
          } else {
            this.router.navigate(['/clients/new']);
          }
        });
    }

    this.clientForm = new FormGroup({
      clientNumber: new FormControl(clientNumber, [
        Validators.required,
        Validators.pattern(Patterns.number),
      ]),
      clientName: new FormControl(clientName, [
        Validators.required,
        Validators.pattern(Patterns.geoAndEng),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      clientSurname: new FormControl(clientSurname, [
        Validators.required,
        Validators.pattern(Patterns.geoAndEng),
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      clientGender: new FormControl(clientGender),
      clientPersonalNumber: new FormControl(clientPersonalNumber, [
        Validators.required,
        Validators.pattern(Patterns.personalNumber),
      ]),
      clientMobileNumber: new FormControl(clientMobileNumber, [
        Validators.required,
        Validators.pattern(Patterns.mobile),
      ]),
      clientImage: new FormControl(clientImage),
      legalAddress: legalAddress,
      actualAddress: actualAddress,
    });
  }

  ngOnDestroy() {
    if (this.clientSub$) {
      this.clearClientSubscription();
    }
  }

  clearClientSubscription() {
    this.clientSub$.unsubscribe();
  }
}
