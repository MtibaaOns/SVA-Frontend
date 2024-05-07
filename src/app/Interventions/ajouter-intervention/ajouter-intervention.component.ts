import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { InterventionService } from '../intervention.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Intervention } from '../intervention.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment';
import { Observable, map } from 'rxjs';
import { Cause } from '../../Cause/cause.model';
import { Utilisateur } from '../../parametrages/utilisateur/utilisateur';
import { Client } from '../../liste-client/liste-client';
import { PieceRechange } from '../../PieceRechange/piece-rechange.model';


@Component({
  selector: 'app-ajouter-intervention',
  templateUrl: './ajouter-intervention.component.html',
  styleUrls: ['./ajouter-intervention.component.css']
})
export class AjouterInterventionComponent implements OnInit {
  dureeOptions: string[] = ['30 minutes', '1 heure', '2 heures', '3 heures', '4 heures', '5 heures', '6 heures', '7 heures', '8 heures', '9 heures', '10 heures', '11 heures', '12 heures', '13 heures', '14 heures', '15 heures', '16 heures', '17 heures', '18 heures', '19 heures', '20 heures', '21 heures', '22 heures', '23 heures', '24 heures'];
  causes!: Cause[];
  utilisateurs!: Utilisateur[];
  clients!: Client[];
  pieceRechanges! : PieceRechange[];
  private apiServerUrl = environment.apiBaseUrl;
  interventionForm!: FormGroup;
  public interventionIdUpdate!: number;
  public isUpdateActive: boolean = false;
  lastCodeNumber: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _fb: FormBuilder,
    private interventionService: InterventionService,
    private toastService: NgToastService,
    private activateactiveroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.interventionForm = this._fb.group({
      code: ['', Validators.required],
      dateDeb: ['', [Validators.required, this.validateRange.bind(this)]],
      dateFin: ['', [Validators.required, this.validateRange.bind(this)]],
      duree: ['', Validators.required],
      observation: ['', Validators.required],
      cloturer: [false, Validators.required],
      montantHT: ['', Validators.required],
      facturer: [false, Validators.required],
      cause: ['', Validators.required],
      technicien: ['', Validators.required],
      client: ['', Validators.required],
      pieceRechange: ['', Validators.required],

    });

    this.activateactiveroute.params.subscribe(val => {
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
        this.generateCode(); // Appel de la méthode generateCode()
      }
    });
    this.getPieceRechanges().subscribe(pieceRechanges=> {
      this.pieceRechanges = pieceRechanges;
    });

    this.getCauses().subscribe(causes => {
      this.causes = causes;
    });
     
    this.getUtilisateurs().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
    });
    this.getClients().subscribe(clients => {
      this.clients = clients;
    });
    this.interventionForm.setValidators(this.validateRange.bind(this));
  }

  onFormSubmit() {
    if (this.interventionForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veuillez remplir le formulaire de nouveau', duration: 3000 });
    } else {
      // Générer le code de l'intervention
      this.generateCode();
      this.getUtilisateurs;
  
      if (this.isUpdateActive) {
        this.modifier();
      } else {
        this.interventionService.addIntervention(this.interventionForm.value).subscribe({
          next: (res: any) => {
            this.toastService.success({ detail: "Succès", summary: "Intervention ajoutée", duration: 3000 });
            this.router.navigate(['liste_interventions']); // Redirigez vers la liste des interventions
            this.interventionForm.reset();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }
  modifier() {
    const intervention = this.interventionForm.value;
    const id = this.interventionIdUpdate;
    const { dateDeb, dateFin, duree, observation, cloturer, montantHT, facturer, cause, technicien,client,pieceRechange } = intervention;

    this.interventionService.updateIntervention(intervention, id, dateDeb, dateFin, duree, observation, cloturer, montantHT, facturer, cause, technicien,client,pieceRechange)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: "Les détails d'intervention ont été mis à jour avec succès", duration: 3000 });
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
      montantHT: intervention.montantHT,
      facturer: intervention.facturer,
      cause: intervention.cause,
      technicien: intervention.technicien,
      client:intervention.client,
      pieceRechange:intervention.pieceRechange
    });
  }

  generateCode(): void {
    this.interventionService.getAllInterventions().subscribe((interventions) => {
      const lastIntervention = interventions[interventions.length - 1];
      const lastCode = lastIntervention ? lastIntervention.code : 'interv-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `interv-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.interventionForm.patchValue({ code: newCode });
    });
  }
  getPieceRechanges(): Observable<PieceRechange[]> {
    return this.http.get<PieceRechange[]>(this.apiServerUrl + '/piecesrechanges/all');
  }


  getCauses(): Observable<Cause[]> {
    return this.http.get<Cause[]>(this.apiServerUrl + '/causes/all');
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiServerUrl + '/Utilisateurs/all').pipe(
      map(utilisateurs => utilisateurs.filter(utilisateur => utilisateur.role === 'Tech'))
    );
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiServerUrl + '/Clients/all');
  }

  // Validation personnalisée pour la date de début et de fin
  validateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('dateDeb')?.value;
    const endDate = control.get('dateFin')?.value;

    if (startDate && endDate) {
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();

      if (startDateTime > endDateTime) {
        control.get('dateDeb')?.setErrors({ 'dateRangeError': true });
        control.get('dateFin')?.setErrors({ 'dateRangeError': true });
        return { 'dateRangeError': true };
      } 
       else {
        control.get('dateDeb')?.setErrors(null);
        control.get('dateFin')?.setErrors(null);
      }
    }

    return null;
  }

}