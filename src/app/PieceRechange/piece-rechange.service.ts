import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
import { PieceRechange } from './piece-rechange.model';

@Injectable({
  providedIn: 'root'
})
export class PieceRechangeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllPiecesRechanges(): Observable<PieceRechange[]> {
    return this.http.get<PieceRechange[]>(`${this.apiServerUrl}/piecesrechanges/all`);
  }

  public getPieceRechangeById(id: number): Observable<PieceRechange> {
    return this.http.get<PieceRechange>(`${this.apiServerUrl}/piecesrechanges/find/${id}`);
  }

  public addPieceRechange(pieceRechange: PieceRechange): Observable<PieceRechange> {
    return this.http.post<PieceRechange>(`${this.apiServerUrl}/piecesrechanges/add`, pieceRechange);
  }

  public updatePieceRechange(pieceRechange: PieceRechange, id: number, desPiece: string, prixAchat: number, tauxTVA: number,categoriePiece:string): Observable<PieceRechange> {
    return this.http.put<PieceRechange>(`${this.apiServerUrl}/piecesrechanges/update/${id}?desPiece=${desPiece}&prixAchat=${prixAchat}&tauxTVA=${tauxTVA}&categoriePiece=${categoriePiece}`, pieceRechange);
  }

  public deletePieceRechange(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/piecesrechanges/delete/${id}`);
  }
}