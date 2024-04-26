import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionsService } from '../interventions.service';
import { NgToastService } from 'ng-angular-popup';
import { Intervention } from '../interventions.model';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-intervention',
  templateUrl: './ajouter-intervention.component.html',
  styleUrl: './ajouter-intervention.component.css'
})


export class AjouterInterventionComponent {

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  interventionForm!: FormGroup;
  public interventionIdUpdate!:number;
  public isUpdateActive: boolean = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private interventionsService: InterventionsService,
    private toastService: NgToastService,
    private activateactiveroute : ActivatedRoute,
   
  ){}

  ngOnInit(): void {
    this.interventionForm = this._fb.group({
      codeinterv: [''],
      datedebinterv: [''],
      datefininterv: [''],
      dureeinterv: [''],
      observationinterv: [''],
      clotureinterv: [''],
    });
    this.activateactiveroute.params.subscribe(val => {
      this.interventionIdUpdate = val['codeinterv'];
      if (this.interventionIdUpdate) {
        this.isUpdateActive = true;
        this.interventionsService.getInterventionByCodeinterv(this.interventionIdUpdate).subscribe({
          next: (intervention) => {
            this.fillFormToUpdate(intervention);
          },
          error: (err) => {
            console.log(err);
          }

        });
      }
    });
  }

  onFormSubmit() {
    this.interventionsService.addIntervention(this.interventionForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Succes",summary:"intervention ajouté",duration:3000});
        this.interventionForm.reset();
      },
      
    );
  }

  modifier() {
    const intervention = this.interventionForm.value;
    const codeinterv = this.interventionIdUpdate;
    const { datedebinterv, datefininterv, dureeinterv, observationinterv, clotureinterv  } = intervention;
  
    this.interventionsService.updateIntervention(intervention,codeinterv,datedebinterv,datefininterv,dureeinterv, observationinterv, clotureinterv)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: "Les détails d'interventions ont été mis à jour avec succès", duration: 3000 });
        this.router.navigate(['liste_intervention']);
        this.interventionForm.reset();
      });
  }
  fillFormToUpdate(intervention: Intervention) {
    this.interventionForm.patchValue({
      codeinterv: intervention.codeinterv,
      datedebinterv: intervention.datedebinterv,
      datefininterv: intervention.datefininterv,
      dureeinterv: intervention.dureeinterv,
      observationinterv: intervention.observationinterv,
      clotureinterv: intervention.clotureinterv,
    });
  }
    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());
  }