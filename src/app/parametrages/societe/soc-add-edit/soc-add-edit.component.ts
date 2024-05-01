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

  constructor(
    private _fb: FormBuilder,
    private societeService: SocieteService,
    private _dialogRef: MatDialogRef<SocAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Societe
  ) {
    this.socForm = this._fb.group({
      raisonSocial: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      mf: ['', Validators.required]
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
    if (this.socForm) {
      if (this.socForm.valid) {
        const email = this.socForm.get('email')?.value;
        if (email) {
          this.emailExists = this.societes.some((societe) => societe.email === email);

          if (!this.emailExists) {
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
    }
  }
}