import { Injectable } from '@angular/core';
import { Contrat } from './contrat.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiServerUrl}/Contrats/all`);
  }

  public getContratBynumcontrat(numcontrat: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiServerUrl}/Contrats/find/${numcontrat}`);
  }

  public addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.apiServerUrl}/Contrats/add`, contrat);
  }

  public updateContrat(contrat: Contrat, numcontrat: number, dateDebut: Date, dateFin: Date, nbInterMois: number, nbInterAnnee: number, mtForfaitaire: string, client:string): Observable<Contrat> {
    
    return this.http.put<Contrat>(`${this.apiServerUrl}/Contrats/update/${numcontrat}?dateDebut=${dateDebut}&dateFin=${dateFin}&nbInterMois=${nbInterMois}&nbInterAnnee=${nbInterAnnee}&mtForfaitaire=${mtForfaitaire}&client=${client}`, contrat);
  }
  public deleteContrat(numcontrat: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Contrats/delete/${numcontrat}`);
  }
}
