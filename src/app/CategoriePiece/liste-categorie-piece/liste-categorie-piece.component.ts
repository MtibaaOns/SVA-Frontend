import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriePiece } from '../categorie-piece.model';
import { CategoriePieceService } from '../categorie-piece.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AjouterCategoriePieceComponent } from '../ajouter-categorie-piece/ajouter-categorie-piece.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-liste-categorie-piece',
  templateUrl: './liste-categorie-piece.component.html',
  styleUrl: './liste-categorie-piece.component.css'
})
export class ListeCategoriePieceComponent implements OnInit {
  displayedColumns: string[] = ['codeCategorie', 'desCategorie', 'actions'];
  public categoriesPiece: MatTableDataSource<CategoriePiece> = new MatTableDataSource<CategoriePiece>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private categoriePieceService: CategoriePieceService,  private toastService: NgToastService) {}

  ngOnInit(): void {
    this.getAllCategoriesPiece();
  }

  openAddEditCategoriePieceForm() {
    const dialogRef = this.dialog.open(AjouterCategoriePieceComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCategoriesPiece();
        }
      }
    });
  }

  getAllCategoriesPiece() {
    this.categoriePieceService.getAllCategoriesPieces().subscribe({
      next: (response: CategoriePiece[]) => {
        this.categoriesPiece = new MatTableDataSource<CategoriePiece>(response);
        this.categoriesPiece.sort = this.sort;
        this.categoriesPiece.paginator = this.paginator;

        console.log(this.categoriesPiece);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoriesPiece.filter = filterValue.trim().toLowerCase();

    if (this.categoriesPiece.paginator) {
      this.categoriesPiece.paginator.firstPage();
    }
  }

  onDeleteCategoriePiece(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie de pièce ?")) {
      this.categoriePieceService.deleteCategoriePiece(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Catégorie de pièce supprimée avec succès", summary: "Succès", duration: 3000 });
          this.getAllCategoriesPiece();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }

  openEditForm(categoriePiece: CategoriePiece): void {
    const dialogRef = this.dialog.open(AjouterCategoriePieceComponent, {
      data: categoriePiece
    });

    this.categoriePieceService.updateCategoriePiece(categoriePiece, categoriePiece.id, categoriePiece.desCategorie);
    this.getAllCategoriesPiece();

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCategoriesPiece();
        }
      }
    });
  }
  }