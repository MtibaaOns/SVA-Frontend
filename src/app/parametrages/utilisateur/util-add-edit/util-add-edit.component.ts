
import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-util-add-edit',
  templateUrl: './util-add-edit.component.html',
  styleUrl: './util-add-edit.component.css'
})
export class UtilAddEditComponent implements OnInit  {
  utilForm: FormGroup
  constructor 
  (  private _fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private _dialogRef: MatDialogRef<UtilAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur
  ){
    this.utilForm = this._fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
  adresse: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  tel: ['', Validators.required],
  role: ['', Validators.required],
  login: ['', Validators.required] ,
  mp: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    console.log(this.data);
   this.utilForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.utilForm.valid) {
      if (this.data) {
        // Ajouter 'raisonSocial' comme troisième paramètre
        this.utilisateurService.updateUtilisateur(this.utilForm.value, this.data.id, this.utilForm.value.nom,this.utilForm.value.prenom,this.utilForm.value.adresse,this.utilForm.value.email,this.utilForm.value.tel,this.utilForm.value.login,this.utilForm.value.mp,this.utilForm.value.role).subscribe({
          next: (val: any) => {
            alert('Société est modifiée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.utilisateurService.addUtilisateur(this.utilForm.value).subscribe({
          next: (val: any) => {
            alert('Société est ajoutée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
