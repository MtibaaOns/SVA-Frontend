import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
import { Depot } from './depot.model';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllDepots(): Observable<Depot[]> {
    return this.http.get<Depot[]>(`${this.apiServerUrl}/depots/all`);
  }

  public getDepotById(id: number): Observable<Depot> {
    return this.http.get<Depot>(`${this.apiServerUrl}/depots/find/${id}`);
  }

  public addDepot(depot: Depot): Observable<Depot> {
    return this.http.post<Depot>(`${this.apiServerUrl}/depots/add`, depot);
  }

  public updateDepot(depot: Depot, id: number, libDep: string): Observable<Depot> {
    return this.http.put<Depot>(`${this.apiServerUrl}/depots/update/${id}?libDep=${libDep}`, depot);
  }

  public deleteDepot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/depots/delete/${id}`);
  }
}