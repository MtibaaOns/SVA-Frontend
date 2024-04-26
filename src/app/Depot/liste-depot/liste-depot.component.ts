import { Component, OnInit, ViewChild } from '@angular/core';
import { Depot } from '../depot.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepotService } from '../depot.service';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrls: ['./liste-depot.component.css']
})
export class ListeDepotComponent implements OnInit {
  public dataSource!: MatTableDataSource<Depot>;
  public depots!: Depot[];

  displayedColumns: string[] = ['id', 'codeDep', 'libDep', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private depotService: DepotService, private router: Router) { }

  ngOnInit() {
    this.getAllDepots();
  }

  getAllDepots() {
    this.depotService.getAllDepots()
      .subscribe({
        next: (res) => {
          this.depots = res;
          this.dataSource = new MatTableDataSource(this.depots);
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

  updateDepot(id: number) {
    this.router.navigate(['update_depot', id]);
  }

  deleteDepot(id: number): void {
    this.depotService.deleteDepot(id).subscribe({
      next: () => {
        console.log("Dépôt supprimé avec succès.");
        this.getAllDepots();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}