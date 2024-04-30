import { Component, Inject, OnInit } from '@angular/core';
import { CategoriePiece } from '../categorie-piece.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriePieceService } from '../categorie-piece.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ajouter-categorie-piece',
  templateUrl: './ajouter-categorie-piece.component.html',
  styleUrls: ['./ajouter-categorie-piece.component.css']
})
export class AjouterCategoriePieceComponent implements OnInit {
  categoriePieceForm: FormGroup;
  lastCodeNumber: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoriePieceService: CategoriePieceService,
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<AjouterCategoriePieceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriePiece
  ) {
    this.categoriePieceForm = this.formBuilder.group({
      codeCategorie: '', // Champ vide initialement
      desCategorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.categoriePieceForm.patchValue(this.data);
    } else {
      this.generateCodeCategorie();
    }
  }

  generateCodeCategorie(): void {
    this.categoriePieceService.getAllCategoriesPieces().subscribe((categoriesPiece) => {
      const lastCategorie = categoriesPiece[categoriesPiece.length - 1];
      const lastCode = lastCategorie ? lastCategorie.codeCategorie : 'categ-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `categ-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.categoriePieceForm.patchValue({ codeCategorie: newCode });
    });
  }

  onFormSubmit(): void {
    if (this.categoriePieceForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veillez remplir le formulaire de nouveau', duration: 3000 });
    } else {
    if (this.categoriePieceForm.valid) {
      if (this.data) {
        this.categoriePieceService.updateCategoriePiece(
          this.data,
          this.data.id,
          this.categoriePieceForm.value.desCategorie
        ).subscribe({
          next: () => {
            alert('Catégorie de pièce modifiée avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.categoriePieceService.addCategoriePiece(this.categoriePieceForm.value).subscribe({
          next: () => {
            alert('Catégorie de pièce ajoutée avec succès');
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