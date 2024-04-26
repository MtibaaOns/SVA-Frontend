import { Component, ViewChild } from '@angular/core';
import { Intervention } from '../interventions.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InterventionsService } from '../interventions.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-liste-intervention',
  templateUrl: './liste-intervention.component.html',
  styleUrl: './liste-intervention.component.css'
})
export class ListeInterventionComponent {
  public dataSource!: MatTableDataSource<Intervention>
  public interventions!: Intervention[];

  displayedColumns: string[] = ['codeinterv', 'datedebinterv', 'datefininterv', 'dureeinterv', 'observationinterv', 'clotureinterv','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionService:InterventionsService, private route: Router) { }



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
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(codeinterv: number) {
    this.route.navigate(['update_intervention', codeinterv]);
  }


  OndeleteInterventions(codeinterv: number): void {
    this.interventionService.deleteIntervention(codeinterv).subscribe({
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
