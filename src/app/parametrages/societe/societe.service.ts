import { Injectable } from '@angular/core';
import { Societe } from './societe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllSocietes(): Observable<Societe[]>{
      return this.http.get<Societe[]> (`${this.apiServerUrl}/Sociétés/all`)
      console.log()
  }
  public getSocieteById(id: number): Observable<Societe[]> {
    return this.http.get<Societe[]>(`${this.apiServerUrl}/find/${id}`);
  }
    public addSociete(société: Societe): Observable<Societe> {
      return this.http.post<Societe>(`${this.apiServerUrl}/Sociétés/add`, société);
    }
  
    public updateSociete(societe: Societe, id: number, raisonSocial: string, adresse: string, email: string, tel: string, mf: string): Observable<Societe> {
      // Inclure les paramètres dans le corps de la requête
      return this.http.put<Societe>(`${this.apiServerUrl}/Sociétés/update/${id}?raisonSocial=${raisonSocial}&adresse=${adresse}&email=${email}&tel=${tel}&mf=${mf}`, societe);
    }
  
    public deleteSociete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/Sociétés/delete/${id}`);
    }
    }

 