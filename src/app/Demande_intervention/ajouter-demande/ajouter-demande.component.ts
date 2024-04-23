import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute,Router } from '@angular/router';
import { Demande } from '../dem_interv.model';
import { DemIntervService } from '../dem-interv.service';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-demande',
  templateUrl: './ajouter-demande.component.html',
  styleUrl: './ajouter-demande.component.css'
})
export class AjouterDemandeComponent implements OnInit {

  
 
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  demandeForm!: FormGroup;
  public demandeIdUpdate!:number;
  public isUpdateActive: boolean = false;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private demandeService: DemIntervService,
    private toastService: NgToastService,
    private activateactiveroute : ActivatedRoute,
   
   
  ){}
  ngOnInit(): void {
    this.demandeForm = this._fb.group({
      numDem: [''],
      statut: [''],
      dateFin: [''],
      dateDeb: [''],
      titre: [''],
      priorite: [''],
      description: [''],
    });
 
    this.activateactiveroute.params.subscribe(val => {
      this.demandeIdUpdate = val['numDem'];
      if (this.demandeIdUpdate) {
        this.isUpdateActive = true;
        this.demandeService.getDemandeBynumDem(this.demandeIdUpdate).subscribe({
          next: (demande) => {
            this.fillFormToUpdate(demande);
          },
          error: (err) => {
            console.log(err);
          }

        });
      }
    });
  }
  onFormSubmit() {
    this.demandeService.addDemande(this.demandeForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Succes",summary:"Demande ajouté",duration:3000});
        this.demandeForm.reset();
      },
      
    );
  }
  modifier() {
    const demande = this.demandeForm.value;
    const numDem = this.demandeIdUpdate;
    const { dateDeb, dateFin, statut, titre, description ,priorite } = demande;
  
    this.demandeService.updateDemande(demande, numDem,statut,titre,priorite, dateDeb, dateFin,  description)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du demande ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_demande']);
        this.demandeForm.reset();
      });
  }
  fillFormToUpdate(demande: Demande) {
    this.demandeForm.patchValue({
      numDem: demande.numDem,
      dateDeb: demande.dateDeb,
      dateFin: demande.dateFin,
      statut: demande.statut,
      titre: demande.titre,
      priorite : demande.priorite,
      description: demande.description,
    });
  }
    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());
  }
  