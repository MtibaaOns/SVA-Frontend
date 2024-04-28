import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intervention } from './interventions.model';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {


   private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.apiServerUrl}/interventions/all`);
  }

  public getInterventionById(id: number): Observable<Intervention> {
    return this.http.get<Intervention>(`${this.apiServerUrl}/interventions/find/${id}`);
  }

  public addIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.apiServerUrl}/interventions/add`, intervention);
  }

  public updateIntervention(intervention: Intervention, id: number, dateDeb: string, dateFin: string, duree: string, observation: string, cloturer: boolean, cause: string,facturer:boolean,MontantHT:number): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiServerUrl}/interventions/update/${id}?dateDeb=${dateDeb}&dateFin=${dateFin}&duree=${duree}&observation=${observation}&cloturer=${cloturer}&cause=${cause}&facturer=${facturer}&MontantHT=${MontantHT}`, intervention);
  }

  public deleteIntervention(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/interventions/delete/${id}`);
  }
}


