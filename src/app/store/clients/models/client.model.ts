import { Address } from './address.model';

export interface Client {
  id: number;
  clientNumber: string;
  clientName: string;
  clientSurname: string;
  clientGender: string;
  clientPersonalNumber: string;
  clientMobileNumber: string;
  clientImage: string;
  legalAddress: Address;
  actualAddress: Address;
}
