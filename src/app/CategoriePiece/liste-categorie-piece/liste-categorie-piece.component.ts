import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriePiece } from '../categorie-piece.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriePieceService } from '../categorie-piece.service';

@Component({
  selector: 'app-liste-categorie-piece',
  templateUrl: './liste-categorie-piece.component.html',
  styleUrl: './liste-categorie-piece.component.css'
})
export class ListeCategoriePieceComponent implements OnInit {
  public dataSource!: MatTableDataSource<CategoriePiece>;
  public categoriesPieces!: CategoriePiece[];

  displayedColumns: string[] = ['id','codeCategorie','desCategorie', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriePieceService: CategoriePieceService, private router: Router) { }

  ngOnInit() {
    this.getAllCategoriesPieces();
  }

  getAllCategoriesPieces() {
    this.categoriePieceService.getAllCategoriesPieces
    ()
      .subscribe({
        next: (res) => {
          this.categoriesPieces = res;
          this.dataSource = new MatTableDataSource(this.categoriesPieces);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateCategoriePiece(id: number) {
    this.router.navigate(['update_categorie_piece', id]);
  }

  deleteCategoriePiece(id: number): void {
    this.categoriePieceService.deleteCategoriePiece(id).subscribe({
      next: () => {
        console.log("Catégorie de pièce supprimée avec succès.");
        this.getAllCategoriesPieces();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
