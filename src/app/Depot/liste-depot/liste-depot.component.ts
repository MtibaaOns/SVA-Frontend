import { Component, OnInit, ViewChild } from '@angular/core';
import { Depot } from '../depot.model';
import { DepotService } from '../depot.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AjouterDepotComponent } from '../ajouter-depot/ajouter-depot.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrl: './liste-depot.component.css'
})
export class ListeDepotComponent implements OnInit {
  displayedColumns: string[] = ['codeDep', 'libDep', 'actions'];
  public depots: MatTableDataSource<Depot> = new MatTableDataSource<Depot>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private depotService: DepotService) {}

  ngOnInit(): void {
    this.getAllDepots();
  }

  openAddEditDepotForm() {
    const dialogRef = this.dialog.open(AjouterDepotComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllDepots();
        }
      }
    });
  }

  getAllDepots() {
    this.depotService.getAllDepots().subscribe({
      next: (response: Depot[]) => {
        this.depots = new MatTableDataSource<Depot>(response);
        this.depots.sort = this.sort;
        this.depots.paginator = this.paginator;

        console.log(this.depots);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.depots.filter = filterValue.trim().toLowerCase();

    if (this.depots.paginator) {
      this.depots.paginator.firstPage();
    }
  }

  onDeleteDepot(id: number): void {
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

  openEditForm(depot: Depot): void {
    const dialogRef = this.dialog.open(AjouterDepotComponent, {
      data: depot
    });

    this.depotService.updateDepot(depot, depot.id, depot.libDep);
    this.getAllDepots();

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllDepots();
        }
      }
    });
  }
  }