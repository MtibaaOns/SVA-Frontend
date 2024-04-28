import { Component, OnInit, ViewChild } from '@angular/core';
import { Intervention } from '../interventions.model'; // Supposons que vous ayez défini une interface Intervention
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InterventionsService } from '../interventions.service';// Supposons que vous ayez défini un service InterventionService

@Component({
  selector: 'app-liste-interventions',
  templateUrl: './liste-interventions.component.html',
  styleUrls: ['./liste-interventions.component.css']
})
export class ListeInterventionsComponent implements OnInit {
  public dataSource!: MatTableDataSource<Intervention>;
  public interventions!: Intervention[];

  displayedColumns: string[] = [ 'code', 'dateDeb', 'dateFin', 'duree', 'observation', 'cloturer', 'MontantHT', 'facturer', 'cause', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionService: InterventionsService, private route: Router) {}

  ngOnInit() {
    this.getAllInterventions();
  }

  getAllInterventions() {
    this.interventionService.getAllInterventions()
      .subscribe({
        next: (res) => {
          this.interventions = res;
          this.dataSource = new MatTableDataSource(this.interventions);
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
    this.route.navigate(['update_intervention', id]);
  }

  onDeleteIntervention(id: number): void {
    this.interventionService.deleteIntervention(id).subscribe({
      next: () => {
        console.log("Intervention supprimée avec succès.");
        this.getAllInterventions();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}