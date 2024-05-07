import { Component, Inject, OnInit } from '@angular/core';
import { Societe } from '../societe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocieteService } from '../societe.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-soc-add-edit',
  templateUrl: './soc-add-edit.component.html',
  styleUrls: ['./soc-add-edit.component.css']
})
export class SocAddEditComponent implements OnInit {
  socForm: FormGroup;
  societes: Societe[] = [];
  emailExists = false;
  raisonSocialExists = false;
  telExists = false;
  mfExists = false;

  constructor(
    private _fb: FormBuilder,
    private societeService: SocieteService,
    private _dialogRef: MatDialogRef<SocAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Societe
  ) {
    this.socForm = this._fb.group({
      raisonSocial: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(10)]],
      mf: ['', [Validators.required, Validators.minLength(7)]]
    });

    // Écouter les changements de valeur des champs
    this.socForm.get('email')?.valueChanges.subscribe((email) => {
      this.emailExists = this.societes.some((societe) => societe.email === email);
      this.socForm.get('email')?.setErrors(this.emailExists ? { notUnique: true } : null);
    });

    this.socForm.get('raisonSocial')?.valueChanges.subscribe((raisonSocial) => {
      this.raisonSocialExists = this.societes.some((societe) => societe.raisonSocial === raisonSocial);
      this.socForm.get('raisonSocial')?.setErrors(this.raisonSocialExists ? { notUnique: true } : null);
    });

    this.socForm.get('tel')?.valueChanges.subscribe((tel) => {
      this.telExists = this.societes.some((societe) => societe.tel === tel);
      this.socForm.get('tel')?.setErrors(this.telExists ? { notUnique: true } : null);
    });

    this.socForm.get('mf')?.valueChanges.subscribe((mf) => {
      this.mfExists = this.societes.some((societe) => societe.mf === mf);
      this.socForm.get('mf')?.setErrors(this.mfExists ? { notUnique: true } : null);
    });
  }

  ngOnInit(): void {
    this.getSocietes();
    console.log(this.data);
    if (this.data) {
      this.socForm.patchValue(this.data);
    }
  }

  getSocietes() {
    this.societeService.getAllSocietes().subscribe(
      (societes) => {
        this.societes = societes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFormSubmit() {
    if (this.socForm.valid) {
      if (this.data) {
        this.societeService.updateSociete(this.socForm.value, this.data.id, this.socForm.value.raisonSocial, this.socForm.value.adresse, this.socForm.value.email, this.socForm.value.tel, this.socForm.value.mf).subscribe({
          next: (val: any) => {
            alert('Société est modifiée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.societeService.addSociete(this.socForm.value).subscribe({
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