import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment';
import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllutilisateurs(): Observable<Utilisateur[]>{
      return this.http.get<Utilisateur[]> (`${this.apiServerUrl}/Utilisateurs/all`)
      console.log()
  }
  public getUtilisateurById(id: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/find/${id}`);
  }
    public addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
      return this.http.post<Utilisateur>(`${this.apiServerUrl}/Utilisateurs/add`, utilisateur);
    }
  
    public updateUtilisateur(utilisateur: Utilisateur, id: number, nom: string,prenom: string, adresse: string, email: string, tel: string, mp: string,login: string,role: string,specialite:string): Observable<Utilisateur> {
      // Inclure les paramètres dans le corps de la requête
      return this.http.put<Utilisateur>(`${this.apiServerUrl}/Utilisateurs/update/${id}?nom=${nom}&prenom=${prenom}&email=${email}&tel=${tel}&adresse=${adresse}&mp=${mp}&login=${login}&role=${role}&specialite=${specialite}`, utilisateur);
    }
  
    public deleteUtilisateur(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/Utilisateurs/delete/${id}`);
    }
    }

 