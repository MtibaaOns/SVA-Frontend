import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SpecAddEditComponent } from './spec-add-edit/spec-add-edit.component';
import { Specialite } from './specialite';
import { SpecialiteService } from './specialite.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.css'
})
export class SpecialiteComponent implements OnInit {

  //specialite
  displayedColumns: string[] = [ 'code', 'libSpec','actions'];
  public specialites: MatTableDataSource<Specialite> = new MatTableDataSource<Specialite>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private specialitesService: SpecialiteService) {}

  ngOnInit(): void {
    this.getAllSpecialites();
  }

  openAddEditSpecForm() {
    const DialogRef = this._dialog.open(SpecAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllSpecialites();
        }
      }
    });
  }

  getAllSpecialites() {
    this.specialitesService.getAllSpecialites().subscribe({
      next: (response: Specialite[]) => {
        this.specialites = new MatTableDataSource<Specialite>(response); // Utilisation de l'instanciation correcte de MatTableDataSource
        this.specialites.sort = this.sort;
        this.specialites.paginator = this.paginator;
      
        console.log(this.specialites);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }
      
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.specialites.filter = filterValue.trim().toLowerCase();

    if (this.specialites.paginator) {
      this.specialites.paginator.firstPage();
    }
  }

  OndeleteSpecialite(codeSpec: number): void {
    this.specialitesService.deleteSpecialite(codeSpec).subscribe({
      next: () => {
        console.log("Spécialité supprimée avec succès.");
        this.getAllSpecialites();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  openEditForm(specialite: Specialite): void {
    const dialogRef = this._dialog.open(SpecAddEditComponent, {
      data: specialite 
      
    });
  
    this.specialitesService.updateSpecialite(specialite, specialite.codeSpec, specialite.libSpec.toString())
        this.getAllSpecialites();
      
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getAllSpecialites();
            }
          },
        });
      }
      
      







    }


