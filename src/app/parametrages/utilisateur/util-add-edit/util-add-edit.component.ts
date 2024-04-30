import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { Specialite } from '../../specialite/specialite';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../assets/environments/environment';

@Component({
  selector: 'app-util-add-edit',
  templateUrl: './util-add-edit.component.html',
  styleUrls: ['./util-add-edit.component.css']
})
export class UtilAddEditComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  specialites!: Specialite[];
  cloture = ["Admin", "Tech"];
  hide = true;
  utilForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private _dialogRef: MatDialogRef<UtilAddEditComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur
  ) {
    this.utilForm = this._fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      role: ['', Validators.required],
      login: ['', Validators.required],
      mp: ['', Validators.required],
      specialite: ['', Validators.required]
    });

    this.utilForm.get('role')?.valueChanges.subscribe(() => {
      this.onRoleChange();
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.utilForm.patchValue(this.data);
    this.getSpecialites().subscribe((specialites) => {
      this.specialites = specialites;
    });
  }

  onFormSubmit() {
    if (this.utilForm.valid) {
      if (this.data) {
        this.utilisateurService.updateUtilisateur(this.utilForm.value, this.data.id, this.utilForm.value.nom, this.utilForm.value.prenom, this.utilForm.value.adresse, this.utilForm.value.email, this.utilForm.value.tel, this.utilForm.value.login, this.utilForm.value.mp, this.utilForm.value.role, this.utilForm.value.specialite).subscribe({
          next: (val: any) => {
            alert('Utilisateur est modifiée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.utilisateurService.addUtilisateur(this.utilForm.value).subscribe({
          next: (val: any) => {
            alert('Utilisateur est ajoutée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.apiServerUrl + '/specialites/all');
  }

  onRoleChange(): void {
    const roleControl = this.utilForm.get('role');
    const specialiteControl = this.utilForm.get('specialite');

    if (roleControl && specialiteControl) {
      if (roleControl.value === 'Admin') {
        specialiteControl.setValue('Aucune spécialité');
        specialiteControl.disable(); // Optionnel : pour désactiver le champ
      } else {
        specialiteControl.enable(); // Optionnel : pour réactiver le champ si nécessaire
      }
    }
  }
}