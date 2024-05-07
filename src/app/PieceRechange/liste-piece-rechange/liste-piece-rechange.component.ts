import { Component, OnInit, ViewChild } from '@angular/core';
import { PieceRechange } from '../piece-rechange.model';
import { PieceRechangeService } from '../piece-rechange.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AjouterPieceRechangeComponent } from '../ajouter-piece-rechange/ajouter-piece-rechange.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-liste-piece-rechange',
  templateUrl: './liste-piece-rechange.component.html',
  styleUrl: './liste-piece-rechange.component.css'
})
export class ListePieceRechangeComponent implements OnInit{
  displayedColumns: string[] = ['codePiece', 'desPiece', 'prixAchat', 'tauxTVA','categoriePiece', 'actions'];
  public piecesRechange: MatTableDataSource<PieceRechange> = new MatTableDataSource<PieceRechange>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private pieceRechangeService: PieceRechangeService, private toastService: NgToastService) {}

  ngOnInit(): void {
    this.getAllPiecesRechanges();
  }
  openAddEditPieceRechangeForm() {
    const dialogRef = this.dialog.open(AjouterPieceRechangeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllPiecesRechanges();
        }
      }
    });
  }

  getAllPiecesRechanges() {
    this.pieceRechangeService.getAllPiecesRechanges().subscribe({
      next: (response: PieceRechange[]) => {
        this.piecesRechange = new MatTableDataSource<PieceRechange>(response);
        this.piecesRechange.sort = this.sort;
        this.piecesRechange.paginator = this.paginator;

        console.log(this.piecesRechange);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.piecesRechange.filter = filterValue.trim().toLowerCase();

    if (this.piecesRechange.paginator) {
      this.piecesRechange.paginator.firstPage();
    }
  }

  onDeletePieceRechange(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette pièce de rechange ?")) {
      this.pieceRechangeService.deletePieceRechange(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Pièce de rechange supprimée avec succès", summary: "Succès", duration: 3000 });
          this.getAllPiecesRechanges();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }

  openEditForm(pieceRechange: PieceRechange): void {
    const dialogRef = this.dialog.open(AjouterPieceRechangeComponent, {
      data: pieceRechange
    });

    this.pieceRechangeService.updatePieceRechange(pieceRechange, pieceRechange.id, pieceRechange.desPiece, pieceRechange.prixAchat, pieceRechange.tauxTVA,pieceRechange.categoriePiece);
    this.getAllPiecesRechanges();

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllPiecesRechanges();
        }
      }
    });
  }
}


