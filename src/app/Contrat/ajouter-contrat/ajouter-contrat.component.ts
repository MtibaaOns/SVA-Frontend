import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { ContratService } from '../contrat.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute,Router } from '@angular/router';
import { Contrat } from '../contrat.model';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-contrat',
  templateUrl: './ajouter-contrat.component.html',
  styleUrl: './ajouter-contrat.component.css'
})
export class AjouterContratComponent implements OnInit {
  
 
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  contratForm!: FormGroup;
  public contratIdUpdate!:number;
  public isUpdateActive: boolean = false;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private contratService: ContratService,
    private toastService: NgToastService,
    private activateactiveroute : ActivatedRoute,
   
   
  ){}
  ngOnInit(): void {
    this.contratForm = this._fb.group({
      numcontrat: [''],
      dateDebut: [''],
      dateFin: [''],
      nbInterMois: [''],
      nbInterAnnee: [''],
      mtForfaitaire: [''],
    });
 
    this.activateactiveroute.params.subscribe(val => {
      this.contratIdUpdate = val['numcontrat'];
      if (this.contratIdUpdate) {
        this.isUpdateActive = true;
        this.contratService.getContratBynumcontrat(this.contratIdUpdate).subscribe({
          next: (contrat) => {
            this.fillFormToUpdate(contrat);
          },
          error: (err) => {
            console.log(err);
          }

        });
      }
    });
  }
  onFormSubmit() {
    this.contratService.addContrat(this.contratForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Succes",summary:"Contrat ajouté",duration:3000});
        this.contratForm.reset();
      },
      
    );
  }
  modifier() {
    const contrat = this.contratForm.value;
    const numcontrat = this.contratIdUpdate;
    const { dateDebut, dateFin, nbInterMois, nbInterAnnee, mtForfaitaire,  } = contrat;
  
    this.contratService.updateContrat(contrat, numcontrat, dateDebut, dateFin, nbInterMois, nbInterAnnee, mtForfaitaire)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du contrat ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_contrat']);
        this.contratForm.reset();
      });
  }
  fillFormToUpdate(contrat: Contrat) {
    this.contratForm.patchValue({
      numcontrat: contrat.numcontrat,
      dateDebut: contrat.dateDebut,
      dateFin: contrat.dateFin,
      nbInterMois: contrat.nbInterMois,
      nbInterAnnee: contrat.nbInterAnnee,
      mtForfaitaire: contrat.mtForfaitaire,
    });
  }
    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());
  }
  