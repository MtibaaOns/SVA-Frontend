import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ContratService } from '../contrat.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from '../contrat.model';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../liste-client/liste-client';
import { environment } from '../../../assets/environments/environment';
import { Observable } from 'rxjs';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-contrat',
  templateUrl: './ajouter-contrat.component.html',
  styleUrls: ['./ajouter-contrat.component.css']
})
export class AjouterContratComponent implements OnInit {
  clients!: Client[];
  private apiServerUrl = environment.apiBaseUrl;
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  contratForm!: FormGroup;
  public contratIdUpdate!: number;
  public isUpdateActive: boolean = false;
  lastCodeNumber: number = 0;

  constructor(
    
    private http: HttpClient,
    private router: Router,
    private _fb: FormBuilder,
    private contratService: ContratService,
    private toastService: NgToastService,
    private activateactiveroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.contratForm = this._fb.group({
      code: ['', Validators.required],
      dateDebut:  ['', [Validators.required, this.validateDateRange.bind(this)]],
      dateFin: ['', [Validators.required, this.validateDateRange.bind(this)]],
      nbInterMois: ['', [Validators.required, Validators.min(1), Validators.max(11)]],
      nbInterAnnee: ['', [Validators.required, Validators.min(1)]],
      mtForfaitaire: ['', [Validators.required, Validators.min(0)]],
      client:['', Validators.required],
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
      } else {
        this.generateCode(); // Appel de la méthode generateCode()
      }
    });

    this.getClients().subscribe(clients => {
      this.clients = clients;
    });
    this.contratForm.setValidators(this.validateDateRange.bind(this));
  }

  onFormSubmit() {
    if (this.contratForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veillez remplir le formulaire de nouveau', duration: 3000 });
    } else {
    
    // Générer le code de l'intervention
    this.generateCode();

    if (this.isUpdateActive) {
      this.modifier();
    } else {
      this.contratService.addContrat(this.contratForm.value).subscribe({
        next: (res: any) => {
          this.toastService.success({ detail: "Succes", summary: "Contrat ajouté", duration: 3000 });
          this.contratForm.reset();
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }}

  modifier() {
    const contrat = this.contratForm.value;
    const numcontrat = this.contratIdUpdate;
    const { dateDebut, dateFin, nbInterMois, nbInterAnnee, mtForfaitaire, client } = contrat;

    this.contratService.updateContrat(contrat, numcontrat, dateDebut, dateFin, nbInterMois, nbInterAnnee, mtForfaitaire, client)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du contrat ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_contrat']);
        this.contratForm.reset();
      });
  }

  fillFormToUpdate(contrat: Contrat) {
    this.contratForm.patchValue({
      code: contrat.code,
      dateDebut: contrat.dateDebut,
      dateFin: contrat.dateFin,
      nbInterMois: contrat.nbInterMois,
      nbInterAnnee: contrat.nbInterAnnee,
      mtForfaitaire: contrat.mtForfaitaire,
      client: contrat.client
    });
  }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  generateCode(): void {
    this.contratService.getAllContrats().subscribe((contrats) => {
      const lastContrat = contrats[contrats.length - 1];
      const lastCode = lastContrat ? lastContrat.code : 'cont-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `cont-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.contratForm.patchValue({ code: newCode });
    });
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiServerUrl + '/Clients/all');
  }
  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('dateDebut')?.value;
  const endDate = control.get('dateFin')?.value;

  if (startDate && endDate) {
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    if (startDateTime > endDateTime) {
      control.get('dateDebut')?.setErrors({ 'dateRangeError': true });
      control.get('dateFin')?.setErrors({ 'dateRangeError': true });
      return { 'dateRangeError': true };
    } else if (startDateTime === endDateTime) {
      control.get('dateDebut')?.setErrors({ 'dateEqualityError': true });
      control.get('dateFin')?.setErrors({ 'dateEqualityError': true });
      return { 'dateEqualityError': true };
    } else {
      control.get('dateDebut')?.setErrors(null);
      control.get('dateFin')?.setErrors(null);
    }
  }

  return null;
}
}