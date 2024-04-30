import { Component, OnInit, ViewChild } from '@angular/core';
import { Contrat } from '../contrat.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-liste-contrat',
  templateUrl: './liste-contrat.component.html',
  styleUrl: './liste-contrat.component.css'
})
export class ListeContratComponent implements OnInit{
  public dataSource!: MatTableDataSource<Contrat>
  public contrats!: Contrat[];


  displayedColumns: string[] = ['code', 'dateDebut', 'dateFin', 'nbInterMois', 'nbInterAnnee', 'mtForfaitaire','client','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private contratService : ContratService, private route: Router) { }

  ngOnInit() {
    this.getAllContrats();
  }

  getAllContrats() {
    this.contratService.getAllContrats()
      .subscribe({
        next: (res) => {
          this.contrats = res;
          this.dataSource = new MatTableDataSource(this.contrats);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  modifier(numcontrat: number) {
    this.route.navigate(['update_contrat', numcontrat]);
  }

  OndeleteContrat(numcontrat: number): void {
    this.contratService.deleteContrat(numcontrat).subscribe({
      next: () => {
        console.log("Contrat supprimée avec succès.");
        this.getAllContrats();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }



}
