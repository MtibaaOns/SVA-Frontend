import { Component, OnInit, ViewChild } from '@angular/core';
import { Facture } from '../facture.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-liste-facture',
  templateUrl: './liste-facture.component.html',
  styleUrls: ['./liste-facture.component.css']
})
export class ListeFactureComponent implements OnInit {
  public dataSource!: MatTableDataSource<Facture>;
  public factures!: Facture[];

  displayedColumns: string[] = ['code', 'date', 'client', 'totalHT', 'tva', 'totalTTC','intervention', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private factureService: FactureService, private router: Router) { }

  ngOnInit() {
    this.getAllFactures();
  }

  getAllFactures() {
    this.factureService.getAllFactures()
      .subscribe({
        next: (res) => {
          this.factures = res;
          this.dataSource = new MatTableDataSource(this.factures);
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
    this.router.navigate(['update_facture', id]);
  }

  onDeleteFacture(id: number): void {
    this.factureService.deleteFacture(id).subscribe({
      next: () => {
        console.log("Facture supprimée avec succès.");
        this.getAllFactures();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}