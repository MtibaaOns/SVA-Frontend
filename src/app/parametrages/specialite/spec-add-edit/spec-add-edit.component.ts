import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteService } from '../specialite.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Specialite } from '../specialite';

@Component({
  selector: 'app-spec-add-edit',
  templateUrl: './spec-add-edit.component.html',
  styleUrl: './spec-add-edit.component.css'
})
export class SpecAddEditComponent  implements OnInit  {
  specForm: FormGroup
  lastCodeNumber: number = 0;
  constructor 
  (  private _fb: FormBuilder,
    private specialiteService: SpecialiteService,
    private _dialogRef: MatDialogRef<SpecAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Specialite
  ){
    this.specForm = this._fb.group({
      code: '',
  libSpec: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    if(this.data){this.specForm.patchValue(this.data)}
    else{this.generateCode()}
    
  }

  generateCode(): void {
    this.specialiteService.getAllSpecialites().subscribe((specialites) => {
      const lasteSpecialite = specialites[specialites.length - 1];
      const lastCode = lasteSpecialite ? lasteSpecialite.code : 'spec-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `spec-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.specForm.patchValue({ code: newCode });
    });
  }





















  onFormSubmit() {
    if (this.specForm.valid) {
      if (this.data) {
       
        this.specialiteService.updateSpecialite(this.specForm.value, this.data.codeSpec, this.specForm.value.libSpec).subscribe({
          next: (val: any) => {
            alert('Spécialité est modifiée avec succès');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.specialiteService.addSpecialite(this.specForm.value).subscribe({
          next: (val: any) => {
            alert('Spécialité est ajoutée avec succès');
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


