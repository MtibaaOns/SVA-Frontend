import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InterventionsService } from '../interventions.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervention } from '../interventions.model';

@Component({
  selector: 'app-ajouter-interventions',
  templateUrl: './ajouter-interventions.component.html',
  styleUrls: ['./ajouter-interventions.component.css']
})
export class AjouterInterventionsComponent implements OnInit {
  interventionForm!: FormGroup;
  public interventionIdUpdate!: number;
  public isUpdateActive: boolean = false;
  lastCodeNumber: number = 0; // Initialisation du dernier code d'intervention

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private interventionService: InterventionsService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.interventionForm = this._fb.group({
      code: [''], // Champ pour le code de l'intervention
      dateDeb: ['', Validators.required],
      dateFin: ['', Validators.required],
      duree: [''],
      observation: ['', Validators.required],
      cloturer: [false],
      MontantHT: [''],

      facturer: [false],
      cause: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.interventionIdUpdate = val['id'];
      if (this.interventionIdUpdate) {
        this.isUpdateActive = true;
        this.interventionService.getInterventionById(this.interventionIdUpdate).subscribe({
          next: (intervention) => {
            this.fillFormToUpdate(intervention);
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.generateCodeIntervention();
      }
    });
  }

  onFormSubmit() {
    // Générer le code de l'intervention
    this.generateCodeIntervention();
  
    if (this.isUpdateActive) {
      this.onUpdate();
    } else {
      this.interventionService.addIntervention(this.interventionForm.value).subscribe({
        next: (res: any) => {
          this.toastService.success({detail:"Succes",summary:"intervention ajouté",duration:3000});
          this.interventionForm.reset();
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
  onUpdate() {
    const intervention = this.interventionForm.value;
    const id = this.interventionIdUpdate;
    const { dateDeb, dateFin, duree, observation, cloturer, MontantHT, facturer, cause } = intervention;

    this.interventionService.updateIntervention(intervention, id, dateDeb, dateFin, duree, observation, cloturer, MontantHT, facturer, cause)
    .subscribe(res => {
      this.toastService.success({ detail: 'SUCCESS', summary: "Les détails d'interventions ont été mis à jour avec succès", duration: 3000 });
      this.router.navigate(['liste_interventions']);
      this.interventionForm.reset();
    });
  }







  

  fillFormToUpdate(intervention: Intervention) {
    this.interventionForm.patchValue({
      code: intervention.code,
      dateDeb: intervention.dateDeb,
      dateFin: intervention.dateFin,
      duree: intervention.duree,
      observation: intervention.observation,
      cloturer: intervention.cloturer,
      MontantHT: intervention.MontantHT,
      facturer: intervention.facturer,
      cause: intervention.cause
    });
  }
  validateNegativePrice(control: FormControl): { [key: string]: boolean } {
    if (control.value < 0) {
      return { negativePrice: true };
    }
    return {};
  }

  generateCodeIntervention(): void {
    this.interventionService.getAllInterventions().subscribe((interventions) => {
      const lastIntervention = interventions[interventions.length - 1];
      const lastCode = lastIntervention ? lastIntervention.code : 'interv-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `interv-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.interventionForm.patchValue({ code: newCode });
    });
  }
}