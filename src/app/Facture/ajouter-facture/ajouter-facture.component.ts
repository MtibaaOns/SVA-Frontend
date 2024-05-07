import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactureService } from '../facture.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { HttpClient } from '@angular/common/http';
import { Intervention } from '../../Interventions/intervention.model';
import { environment } from '../../../assets/environments/environment';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { InterventionService } from '../../Interventions/intervention.service';

@Component({
  selector: 'app-ajouter-facture',
  templateUrl: './ajouter-facture.component.html',
  styleUrls: ['./ajouter-facture.component.css']
})
export class AjouterFactureComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  factureForm: FormGroup;
  public factureIdUpdate!: number;
  public isUpdateActive: boolean = false;
  lastCodeNumber: number = 0;

  selectedClientInterventions: Intervention[] = [];
  interventions: Intervention[] = [];
  selectedInterventions: Intervention[] = [];
  allSelected: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _fb: FormBuilder,
    private factureService: FactureService,
    private toastService: NgToastService,
    private activateactiveroute: ActivatedRoute,
    private interventionService: InterventionService
  ) {
    this.factureForm = this._fb.group({
      code: ['', Validators.required],
      date: ['', Validators.required],
      client: ['', Validators.required],
      totalHT: ['', [Validators.required, Validators.min(0)]],
      tva: ['', [Validators.required, Validators.min(0)]],
      totalTTC: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.activateactiveroute.params.subscribe(val => {
      this.factureIdUpdate = val['id'];
      if (this.factureIdUpdate) {
        this.isUpdateActive = true;
        this.factureService.getFactureById(this.factureIdUpdate).subscribe({
          next: (facture) => {
            this.fillFormToUpdate(facture);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });

    this.generateCode();

    this.factureForm.get('totalHT')?.valueChanges.subscribe(() => {
      this.calculateTotalTTC();
    });
    
    this.getInterventions().subscribe(interventions => {
      this.interventions = interventions;
    });
  }

  getUniqueClients(): string[] {
    if (this.interventions) {
      const uniqueClients = this.interventions
        .filter(intervention => !intervention.facturer) // Filtrer les interventions non facturées
        .reduce((clients, intervention) => {
          if (!clients.includes(intervention.client)) {
            clients.push(intervention.client);
          }
          return clients;
        }, [] as string[]);
      return uniqueClients;
    }
    return [];
  }
  onClientSelectionChange(client: string) {
    this.selectedClientInterventions = this.interventions
      .filter(intervention => intervention.client === client && !intervention.facturer); // Filtrer les interventions non facturées
    this.calculateTotalHT();
  }

  onFormSubmit() {
    if (this.factureForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veuillez remplir le formulaire correctement', duration: 3000 });
    } else {
      if (this.isUpdateActive) {
        this.modifier();
      } else {
        this.factureService.addFacture(this.factureForm.value).subscribe({
          next: (res: any) => {
            this.toastService.success({ detail: "Succès", summary: "Intervention(s) est facturé avec succès ", duration: 3000 });
            this.updateInterventionsAsFactured();
            this.router.navigate(['/liste_interventions']);
            this.factureForm.reset();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }

  modifier() {
    const facture = this.factureForm.value;
    const id = this.factureIdUpdate;
    const { date, client, totalHT, totalTTC, tva } = facture;

    this.factureService.updateFacture(facture, id, date, client, totalHT, totalTTC, tva).subscribe(res => {
      this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails de la facture ont été mis à jour avec succès', duration: 3000 });
      this.router.navigate(['liste_facture']);
      this.factureForm.reset();
    });
  }

  fillFormToUpdate(facture: Facture) {
    this.factureForm.patchValue({
      code: facture.code,
      date: facture.date,
      client: facture.client,
      totalHT: facture.totalHT,
      totalTTC: facture.totalTTC,
      tva: facture.tva,
    });
  }

  generateCode(): void {
    this.factureService.getAllFactures().subscribe((factures) => {
      const lastFacture = factures[factures.length - 1];
      const lastCode = lastFacture ? lastFacture.code : 'fact-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `fact-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.factureForm.patchValue({ code: newCode });
    });
  }

  getInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.apiServerUrl + '/Interventions/all');
  }

  toggleAllSelection(event: any) {
    this.allSelected = event.checked;
    this.selectedInterventions = this.allSelected ? this.selectedClientInterventions.map(intervention => ({ ...intervention, selected: true })) : [];
    this.onRowSelectionChange();
  }

  toggleRowSelection(intervention: Intervention, event: MatCheckboxChange) {
    intervention.selected = event.checked;
    this.onRowSelectionChange();
  }

  onRowSelectionChange() {
    this.selectedInterventions = this.selectedClientInterventions.filter(intervention => intervention.selected);
    this.calculateTotalHT();
    this.calculateTotalTTC();
  }

  calculateTotalHT() {
    const totalHT = this.selectedInterventions.reduce((sum, intervention) => sum + intervention.montantHT, 0);
    this.factureForm.patchValue({ totalHT: totalHT });
  }

  calculateTotalTTC() {
    const totalHT = this.factureForm.get('totalHT')?.value;
    const tva = 19; // Définir le taux de TVA à 19%
  
    if (totalHT && this.selectedInterventions.length > 0) {
      const totalTTC = totalHT + ((totalHT * tva) / 100);
      this.factureForm.patchValue({ tva: tva, totalTTC: totalTTC });
    } else {
      this.factureForm.patchValue({ tva: null, totalTTC: null });
    }
  }

  updateInterventionsAsFactured() {
    this.selectedInterventions.forEach(intervention => {
      intervention.facturer = true;
      this.interventionService.updateIntervention(intervention, intervention.id, intervention.dateDeb, intervention.dateFin, intervention.duree, intervention.observation, intervention.cloturer, intervention.montantHT, intervention.facturer, intervention.cause, intervention.technicien, intervention.client,intervention.pieceRechange).subscribe();
    });
  }
  
}