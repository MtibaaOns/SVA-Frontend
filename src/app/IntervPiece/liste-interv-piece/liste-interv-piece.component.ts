import { Component, OnInit, ViewChild } from '@angular/core';
import { IntervPiece } from '../IntervPiece.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IntervPieceService } from '../interv-piece.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-liste-interv-piece',
  templateUrl: './liste-interv-piece.component.html',
  styleUrls: ['./liste-interv-piece.component.css']
})
export class ListeIntervPieceComponent implements OnInit {
  public dataSource!: MatTableDataSource<IntervPiece>;
  public intervPieces!: IntervPiece[];

  displayedColumns: string[] = ['prixTotal', 'quantitePiece', 'codeInterv', 'codePiece', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private intervPieceService: IntervPieceService, private router: Router, private toastService: NgToastService) { }

  ngOnInit() {
    this.getAllIntervPieces();
  }

  getAllIntervPieces() {
    this.intervPieceService.getAllIntervPieces()
      .subscribe({
        next: (res) => {
          this.intervPieces = res;
          this.dataSource = new MatTableDataSource(this.intervPieces);
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

  modifier(id: number) {
    this.router.navigate(['update_interv_piece', id]);
  }

  onDeleteIntervPiece(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cet Interv_piece ?")) {
      this.intervPieceService.deleteIntervPieceById(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Interv_piece supprimé avec succès", summary: "Succès", duration: 3000 });
          this.getAllIntervPieces();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }
}