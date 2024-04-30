import { Component, Inject, OnInit } from '@angular/core';
import { Cause } from '../cause.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CauseService } from '../cause.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ajouter-cause',
  templateUrl: './ajouter-cause.component.html',
  styleUrls: ['./ajouter-cause.component.css']
})
export class AjouterCauseComponent implements OnInit {
  causeForm: FormGroup;
  lastCodeNumber: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private causeService: CauseService,
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<AjouterCauseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cause
  ) {
    this.causeForm = this.formBuilder.group({
      codeCause: '', // Champ vide initialement
      libCause: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.causeForm.patchValue(this.data);
    } else {
      this.generateCodeCause();
    }
  }

  generateCodeCause(): void {
    this.causeService.getAllCauses().subscribe((causes) => {
      const lastCause = causes[causes.length - 1];
      const lastCode = lastCause ? lastCause.codeCause : 'cause-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `cause-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.causeForm.patchValue({ codeCause: newCode });
    });
  }

  onFormSubmit(): void {
    if (this.causeForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veillez remplir le formulaire de nouveau', duration: 3000 });
    } else {
    if (this.causeForm.valid) {
      if (this.data) {
        this.causeService.updateCause(
          this.data,
          this.data.id,
          this.causeForm.value.libCause
        ).subscribe({
          next: () => {
            alert('Cause modifiée avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.causeService.addCause(this.causeForm.value).subscribe({
          next: () => {
            alert('Cause ajoutée avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
}}