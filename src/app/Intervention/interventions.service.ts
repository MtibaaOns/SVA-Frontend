import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
import { Intervention } from './interventions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  
  public getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.apiServerUrl}/Interventions/all`);
  }
 
  public getInterventionByCodeinterv(codeinterv: number): Observable<Intervention> {
    return this.http.get<Intervention>(`${this.apiServerUrl}/Interventions/find/${codeinterv}`);
  }
  public addIntervention(intervention : Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.apiServerUrl}/Interventions/add`, intervention);
  }
  
  public updateIntervention(intervention : Intervention , codeinterv:number,  datedebinterv : string,  datefininterv: string,  dureeinterv:string, observationinterv:string, clotureinterv:string): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiServerUrl}/Interventions/update/${codeinterv}?datedebinterv=${datedebinterv}&datefininterv=${datefininterv}&dureeinterv=${dureeinterv}&observationinterv=${observationinterv}&clotureinterv=${clotureinterv}`, intervention);
  }
  
  public deleteIntervention(codeinterv: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Interventions/delete/${codeinterv}`);
  }
}
