import { Injectable } from '@angular/core';
import { Client } from './liste-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/Clients/all`);
  }

  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiServerUrl}/Clients/find/${id}`);
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/Clients/add`, client);
  }

  public updateClient(client: Client, id: number, nom: string, prenom: string, raisonSocial: string, adresse: string, email: string,  mf: string,): Observable<Client> {
    // Inclure les paramètres dans le corps de la requête
    return this.http.put<Client>(`${this.apiServerUrl}/Clients/update/${id}?nom=${nom}&prenom=${prenom}&raisonSocial=${raisonSocial}&adresse=${adresse}&email=${email}&mf=${mf}`, client);
  }

  public deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Clients/delete/${id}`);
  }
}
