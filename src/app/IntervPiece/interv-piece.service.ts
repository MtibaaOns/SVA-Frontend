import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntervPiece } from './IntervPiece.model';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntervPieceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllIntervPieces(): Observable<IntervPiece[]> {
    return this.http.get<IntervPiece[]>(`${this.apiServerUrl}/intervPieces/all`);
  }

  public getIntervPieceById(id: number): Observable<IntervPiece> {
    return this.http.get<IntervPiece>(`${this.apiServerUrl}/intervPieces/find/${id}`);
  }

  public addIntervPiece(intervPiece: IntervPiece): Observable<IntervPiece> {
    return this.http.post<IntervPiece>(`${this.apiServerUrl}/intervPieces/add`, intervPiece);
  }

  public updateIntervPiece(id: number, prixTotal: number, quantitePiece: number): Observable<IntervPiece> {
    return this.http.put<IntervPiece>(`${this.apiServerUrl}/intervPieces/update/${id}?prixTotal=${prixTotal}&quantitePiece=${quantitePiece}`, {});
  }

  public deleteIntervPieceById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/intervPieces/delete/${id}`);
  }
}