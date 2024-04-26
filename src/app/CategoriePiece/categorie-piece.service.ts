import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../assets/environments/environment';
import { CategoriePiece } from './categorie-piece.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriePieceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllCategoriesPieces(): Observable<CategoriePiece[]> {
    return this.http.get<CategoriePiece[]>(`${this.apiServerUrl}/categoriespieces/all`);
  }

  public getCategoriePieceById(id: number): Observable<CategoriePiece> {
    return this.http.get<CategoriePiece>(`${this.apiServerUrl}/categoriespieces/find/${id}`);
  }

  public addCategoriePiece(categoriePiece: CategoriePiece): Observable<CategoriePiece> {
    return this.http.post<CategoriePiece>(`${this.apiServerUrl}/categoriespieces/add`, categoriePiece);
  }

  public updateCategoriePiece(categoriePiece: CategoriePiece, id: number, desCategorie: string): Observable<CategoriePiece> {
    return this.http.put<CategoriePiece>(`${this.apiServerUrl}/categoriespieces/update/${id}?desCategorie=${desCategorie}`, categoriePiece);
  }
  public deleteCategoriePiece(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categoriespieces/delete/${id}`);
  }
}
