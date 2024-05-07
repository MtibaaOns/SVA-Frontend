import { Component, OnInit, ViewChild } from '@angular/core';
import { Cause } from '../cause.model';
import { CauseService } from '../cause.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AjouterCauseComponent } from '../ajouter-cause/ajouter-cause.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-liste-cause',
  templateUrl: './liste-cause.component.html',
  styleUrl: './liste-cause.component.css'
})
export class ListeCauseComponent implements OnInit {
  displayedColumns: string[] = ['codeCause', 'libCause', 'actions'];
  public causes: MatTableDataSource<Cause> = new MatTableDataSource<Cause>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private causeService: CauseService, private toastService: NgToastService) {}

  ngOnInit(): void {
    this.getAllCauses();
  }

  openAddEditCauseForm() {
    const dialogRef = this.dialog.open(AjouterCauseComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCauses();
        }
      }
    });
  }

  getAllCauses() {
    this.causeService.getAllCauses().subscribe({
      next: (response: Cause[]) => {
        this.causes = new MatTableDataSource<Cause>(response);
        this.causes.sort = this.sort;
        this.causes.paginator = this.paginator;

        console.log(this.causes);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.causes.filter = filterValue.trim().toLowerCase();

    if (this.causes.paginator) {
      this.causes.paginator.firstPage();
    }
  }

  onDeleteCause(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette cause ?")) {
      this.causeService.deleteCause(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Cause supprimée avec succès", summary: "Succès", duration: 3000 });
          this.getAllCauses();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }

  openEditForm(cause: Cause): void {
    const dialogRef = this.dialog.open(AjouterCauseComponent, {
      data: cause
    });

    this.causeService.updateCause(cause, cause.id, cause.libCause);
    this.getAllCauses();

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCauses();
        }
      }
    });
  }
}