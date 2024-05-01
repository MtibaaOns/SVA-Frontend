import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FactureService } from '../facture.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../liste-client/liste-client';
import { environment } from '../../../assets/environments/environment';
import { Observable } from 'rxjs';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-facture',
  templateUrl: './ajouter-facture.component.html',
  styleUrls: ['./ajouter-facture.component.css']
})
export class AjouterFactureComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  factureForm!: FormGroup;
  public factureIdUpdate!: number;
  public isUpdateActive: boolean = false;
  lastCodeNumber: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _fb: FormBuilder,
    private factureService: FactureService,
    private toastService: NgToastService,
    private activateactiveroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.factureForm = this._fb.group({
      code: ['', Validators.required],
      date: ['', Validators.required],
      client: ['', Validators.required],
      totalHT: ['', [Validators.required, Validators.min(0)]],
      tva: ['', [Validators.required, Validators.min(0)]],
      totalTTC: ['', [Validators.required, Validators.min(0)]],
      intervention: ['', Validators.required]
    });

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

    this.generateCode(); // Appel de la méthode generateCode()
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
            this.toastService.success({ detail: "Succès", summary: "Facture ajoutée", duration: 3000 });
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
    const { date,client,totalHT,totalTTC, tva,intervention } = facture;

    this.factureService.updateFacture(facture, id,date,client,totalHT,totalTTC,tva,intervention).subscribe(res => {
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
      tva: facture.tva,
      totalTTC: facture.totalTTC,
      intervention: facture.intervention
    });
  }

  generateCode(): void {
    this.factureService.getAllFactures().subscribe((factures) => {
      const lastFacture = factures[factures.length - 1];
      const lastCode = lastFacture ? lastFacture.code : 'fact-00'; // Utiliser 'fact-00' comme code initial
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `fact-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`; // Utiliser 'fact-' au lieu de 'cont-'
      this.factureForm.patchValue({ code: newCode });
    });
  }
}