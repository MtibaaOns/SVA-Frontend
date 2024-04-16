import { Injectable } from '@angular/core';
import { Specialite } from './specialite';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SpecialiteService{ 
  private apiServerUrl = environment.apiBaseUrl;

constructor(private http: HttpClient) {}

public getAllSpecialites(): Observable<Specialite[]>{
    return this.http.get<Specialite[]> (`${this.apiServerUrl}/specialites/all`)
    console.log()
}
public getSpecialiteByCodeSpec(codeSpec: number): Observable<Specialite[]> {
  return this.http.get<Specialite[]>(`${this.apiServerUrl}/find/${codeSpec}`);
}
  public addSpecialite(specialite: Specialite): Observable<Specialite> {
    return this.http.post<Specialite>(`${this.apiServerUrl}/specialites/add`, specialite);
  }

  public updateSpecialite(specialite: Specialite, codeSpec: number, libSpec: string): Observable<Specialite> {
    // Inclure les paramètres dans le corps de la requête
    return this.http.put<Specialite>(`${this.apiServerUrl}/specialites/update/${codeSpec}?libSpec=${libSpec}`, specialite);

}

  public deleteSpecialite(codeSpec: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/specialites/delete/${codeSpec}`);
  }
  }

