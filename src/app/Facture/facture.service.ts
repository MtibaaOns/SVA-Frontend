import { Injectable } from '@angular/core';
import { Facture } from './facture.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiServerUrl}/Factures/all`);
  }

  public getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiServerUrl}/Factures/find/${id}`);
  }

  public addFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiServerUrl}/Factures/add`, facture);
  }
  public updateFacture(facture: Facture, id: number, date: Date, client: string, totalHT: number,totalTTC: number, tva: number, intervention: string): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiServerUrl}/Factures/update/${id}?date=${date}&client=${client}&totalHT=${totalHT}&totalTTC=${totalTTC}&tva=${tva}&intervention=${intervention}`, facture); 
  }


  public deleteFacture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Factures/delete/${id}`);
  }
}