import { Injectable } from '@angular/core';
import { Intervention } from './intervention.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.apiServerUrl}/Interventions/all`);
  }

  public getInterventionById(id: number): Observable<Intervention> {
    return this.http.get<Intervention>(`${this.apiServerUrl}/Interventions/find/${id}`);
  }

  public addIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.apiServerUrl}/Interventions/add`, intervention);
  }

  public updateIntervention(intervention: Intervention, id: number, dateDeb: Date, dateFin: Date, duree: string, observation: string, cloturer: boolean, montantHT: number, facturer: boolean, cause: string): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiServerUrl}/Interventions/update/${id}?dateDeb=${dateDeb}&dateFin=${dateFin}&duree=${duree}&observation=${observation}&cloturer=${cloturer}&montantHT=${montantHT}&facturer=${facturer}&cause=${cause}`, intervention);
  }

  public deleteIntervention(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Interventions/delete/${id}`);
  }
}