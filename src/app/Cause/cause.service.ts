import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
import { Cause } from './cause.model';

@Injectable({
  providedIn: 'root'
})
export class CauseService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllCauses(): Observable<Cause[]> {
    return this.http.get<Cause[]>(`${this.apiServerUrl}/causes/all`);
  }

  public getCauseById(id: number): Observable<Cause> {
    return this.http.get<Cause>(`${this.apiServerUrl}/causes/find/${id}`);
  }

  public addCause(cause: Cause): Observable<Cause> {
    return this.http.post<Cause>(`${this.apiServerUrl}/causes/add`, cause);
  }

  public updateCause(cause: Cause, id: number, libCause: string): Observable<Cause> {
    return this.http.put<Cause>(`${this.apiServerUrl}/causes/update/${id}?libCause=${libCause}`, cause);
  }

  public deleteCause(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/causes/delete/${id}`);
  }
}