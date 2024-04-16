import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UtilAddEditComponent } from './util-add-edit/util-add-edit.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {


  displayedColumns: string[] = [ 'id','nom', 'prenom','adresse','email', 'tel','role', 'login','mp','actions'];
  
  public utilisateurs: MatTableDataSource<Utilisateur> = new MatTableDataSource<Utilisateur>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.getAllUtilisateurs();
  }

  openAddEditUtilForm() {
    const DialogRef = this._dialog.open(UtilAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUtilisateurs();
        }
      }
    });
  }

  getAllUtilisateurs() {
    this.utilisateurService.getAllutilisateurs().subscribe({
      next: (response: Utilisateur[]) => {
        this.utilisateurs = new MatTableDataSource<Utilisateur>(response); // Utilisation de l'instanciation correcte de MatTableDataSource
        this.utilisateurs.sort = this.sort;
        this.utilisateurs.paginator = this.paginator;
      
        console.log(this.utilisateurs);
      },
      error: (error: any) => {
        alert(error.message);
      }
    });
  }
      
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.utilisateurs.filter = filterValue.trim().toLowerCase();

    if (this.utilisateurs.paginator) {
      this.utilisateurs.paginator.firstPage();
    }
  }

  OndeleteUtilisateur(id: number): void {
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: () => {
        console.log("Utilisateur supprimée avec succès.");
        this.getAllUtilisateurs();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  openEditForm(utilisateur: Utilisateur): void {
    const dialogRef = this._dialog.open(UtilAddEditComponent, {
      data: utilisateur 
      
    });
  
    this.utilisateurService.updateUtilisateur(utilisateur, utilisateur.id, utilisateur.nom.toString(),utilisateur.prenom.toString(),utilisateur.email.toString(),utilisateur.mp.toString(),utilisateur.login.toString(),utilisateur.role.toString(),utilisateur.adresse.toString(),utilisateur.tel.toString())
        this.getAllUtilisateurs();
      
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getAllUtilisateurs();
            }
          },
        });
      }
      //specialite
      







    }


