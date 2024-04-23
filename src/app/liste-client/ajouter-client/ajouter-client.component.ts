import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../liste-client';
import { ClientService } from '../liste-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css'] // Changed 'styleUrl' to 'styleUrls'
})
export class AjouterClientComponent implements OnInit  {
  cliForm!: FormGroup;
  public clientIdUpdate!:number;
  public isUpdateActive: boolean = false;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private clientService: ClientService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
   
   
  ){}
  ngOnInit(): void {
    this.cliForm = this._fb.group({
      nom: [''],
      prenom: [''],
      raisonSocial: [''],
      adresse: [''],
      email: [''],
      mf: [''] 
    });
  

 
    this.activatedRoute.params.subscribe(val => {
      this.clientIdUpdate = val['id'];
      if (this.clientIdUpdate) {
        this.isUpdateActive = true;
        this.clientService.getClientById(this.clientIdUpdate).subscribe({
          next: (client) => {
            this.fillFormToUpdate(client);
          },
          error: (err) => {
            console.log(err);
          }

        });
      }
    });
  }
  onFormSubmit() {
    this.clientService.addClient(this.cliForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Success",summary:"client ajouté",duration:3000});
        this.cliForm.reset();
      },
      
    );
  }
  modifier() {
    const client = this.cliForm.value;
    const id = this.clientIdUpdate;
    const { nom, prenom, raisonSocial, adresse, email, mf } = client;
  
    this.clientService.updateClient(client, id, nom, prenom, raisonSocial, adresse, email, mf)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du client ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_client']);
        this.cliForm.reset();
      });
  }
  fillFormToUpdate(client: Client) {
   
      // Récupérer le premier client du tableau
      this.cliForm.setValue({
        nom: client.nom,
        prenom: client.prenom,
        raisonSocial: client.raisonSocial,
        adresse: client.adresse,
        email: client.email,
        mf: client.mf
      });
    }
  }