import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from './liste-client';
import { ClientService } from './liste-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrl: './liste-client.component.css'
})
export class ListeClientComponent implements OnInit {
  public clients!: Client[];
  dataSource!: MatTableDataSource<Client>;

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'raisonSocial', 'adresse', 'mf','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private clientService : ClientService, private router: Router) { }

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
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        console.log("Client supprimée avec succès.");
        this.getAllClients();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
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

}