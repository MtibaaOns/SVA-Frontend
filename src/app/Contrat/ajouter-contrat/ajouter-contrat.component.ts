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
  lastCodeNumber: number = 0;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private contratService: ContratService,
    private toastService: NgToastService,
    private activateactiveroute : ActivatedRoute,
   
   
  ){}
  ngOnInit(): void {
    this.contratForm = this._fb.group({
      code: [''],
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
      } else {
        this.generateCode(); // Appel de la méthode generateCode()
      }
    });
  }

  onFormSubmit() {
    // Générer le code de l'intervention
    this.generateCode();
  
    if (this.isUpdateActive) {
      this.modifier();
    } else {
      this.contratService.addContrat(this.contratForm.value).subscribe({
        next: (res: any) => {
          this.toastService.success({detail:"Succes",summary:"Contrat ajouté",duration:3000});
          this.contratForm.reset();
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
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
      code: contrat.code,
      dateDebut: contrat.dateDebut,
      dateFin: contrat.dateFin,
      nbInterMois: contrat.nbInterMois,
      nbInterAnnee: contrat.nbInterAnnee,
      mtForfaitaire: contrat.mtForfaitaire,
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
  }
  