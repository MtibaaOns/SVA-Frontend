import { Component, Inject, OnInit } from '@angular/core';
import { Depot } from '../depot.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepotService } from '../depot.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ajouter-depot',
  templateUrl: './ajouter-depot.component.html',
  styleUrls: ['./ajouter-depot.component.css']
})
export class AjouterDepotComponent implements OnInit {
  depotForm: FormGroup;
  lastCodeNumber: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private depotService: DepotService,
    private dialogRef: MatDialogRef<AjouterDepotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Depot
  ) {
    this.depotForm = this.formBuilder.group({
      codeDep: '', // Champ vide initialement
      libDep: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.depotForm.patchValue(this.data);
    } else {
      this.generateCodeDep();
    }
  }

  generateCodeDep(): void {
    this.depotService.getAllDepots().subscribe((depots) => {
      const lastDepot = depots[depots.length - 1];
      const lastCode = lastDepot ? lastDepot.codeDep : 'code-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `code-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.depotForm.patchValue({ codeDep: newCode });
    });
  }

  onFormSubmit(): void {
    if (this.depotForm.valid) {
      if (this.data) {
        this.depotService.updateDepot(
          this.data,
          this.data.id,
          this.depotForm.value.libDep
        ).subscribe({
          next: () => {
            alert('Dépôt modifié avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.depotService.addDepot(this.depotForm.value).subscribe({
          next: () => {
            alert('Dépôt ajouté avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
}