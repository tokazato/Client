import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Client } from '../models/client.model';
import { NewClient } from '../models/new-client-request.model';
import { Config } from 'src/app/config/config';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  fetchClient() {
    return this.http.get<Client[]>(Config.clients);
  }

  addClient(client: NewClient) {
    return this.http.post<Client>(Config.clients, client);
  }

  updateClient(client: NewClient, id: number) {
    return this.http.put<Client>(Config.clients + `/${id}`, client);
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(Config.clients + `/${id}`);
  }
}
