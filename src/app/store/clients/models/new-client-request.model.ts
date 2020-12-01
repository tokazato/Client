import { Address } from './address.model';

export interface NewClient {
  clientNumber?: string;
  clientName: string;
  clientSurname: string;
  clientGender?: string;
  clientPersonalNumber: string;
  clientMobileNumber: string;
  clientImage?: File | string | object;
  legalAddress: Address;
  actualAddress: Address;
}
