import { Component, OnInit, ViewChild } from '@angular/core';
import { Intervention } from '../intervention.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InterventionService } from '../intervention.service';

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrls: ['./liste-intervention.component.css']
})
export class ListeInterventionComponent implements OnInit {
  public dataSource!: MatTableDataSource<Intervention>;
  public interventions!: Intervention[];

  displayedColumns: string[] = ['code', 'dateDeb', 'dateFin', 'duree', 'observation', 'cloturer', 'montantHT', 'facturer', 'cause', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionService: InterventionService, private route: Router) { }

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

  OndeleteIntervention(id: number): void {
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