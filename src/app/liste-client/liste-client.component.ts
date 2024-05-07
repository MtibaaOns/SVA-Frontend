import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from './liste-client';
import { ClientService } from './liste-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrl: './liste-client.component.css'
})
export class ListeClientComponent implements OnInit {
  public clients!: Client[];
  dataSource!: MatTableDataSource<Client>;

  displayedColumns: string[] = [ 'nom', 'prenom', 'email', 'raisonSocial', 'adresse', 'mf','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private clientService : ClientService, private router: Router,   private toastService: NgToastService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAllClients()
      .subscribe({
        next: (res) => {
          this.clients = res;
          this.dataSource = new MatTableDataSource(this.clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  openEditForm(id: number) {
    this.router.navigate(['update_client', id]);
  }

  OndeleteClient(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Client supprimé avec succès", summary: "Succès", duration: 3000 });
          this.getAllClients();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}