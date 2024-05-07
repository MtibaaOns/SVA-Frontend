import { Component, OnInit, ViewChild } from '@angular/core';
import { Facture } from '../facture.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FactureService } from '../facture.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-liste-facture',
  templateUrl: './liste-facture.component.html',
  styleUrls: ['./liste-facture.component.css']
})
export class ListeFactureComponent implements OnInit {
  public dataSource!: MatTableDataSource<Facture>;
  public factures!: Facture[];

  displayedColumns: string[] = ['code', 'date', 'client', 'totalHT', 'tva', 'totalTTC', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private factureService: FactureService, private router: Router, private toastService: NgToastService)  { }

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
    if (confirm("Voulez-vous vraiment supprimer cette facture ?")) {
      this.factureService.deleteFacture(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Facture supprimée avec succès.", summary: "Facture supprimée", duration: 3000 }); // Utilisation du service de toast pour afficher une notification de succès
          this.getAllFactures();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur lors de la suppression", duration: 3000 }); // Utilisation du service de toast pour afficher une notification d'erreur
        }
      });
    }
  }}