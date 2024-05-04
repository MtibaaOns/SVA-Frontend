import { Component, Inject, OnInit } from '@angular/core';
import { PieceRechange } from '../piece-rechange.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PieceRechangeService } from '../piece-rechange.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoriePiece } from '../../CategoriePiece/categorie-piece.model';
import { environment } from '../../../assets/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ajouter-piece-rechange',
  templateUrl: './ajouter-piece-rechange.component.html',
  styleUrls: ['./ajouter-piece-rechange.component.css']
})
export class AjouterPieceRechangeComponent implements OnInit {
  pieceRechangeForm: FormGroup;
  lastCodeNumber: number = 0;
  categoriepieces!: CategoriePiece[];
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private pieceRechangeService: PieceRechangeService,
    private toastService: NgToastService,
    private dialogRef: MatDialogRef<AjouterPieceRechangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PieceRechange
  ) {
    this.pieceRechangeForm = this.formBuilder.group({
      codePiece: '', // Champ vide initialement
      desPiece: ['', Validators.required],
      prixAchat: ['', [Validators.required, this.validateNegativePrice]],
      tauxTVA: ['', [Validators.required, Validators.min(0), Validators.max(19)]],
      categoriePiece: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.pieceRechangeForm.patchValue(this.data);
    } else {
      this.generateCodePiece();
    }
    this.getCategoriespieces().subscribe(categoriepieces => {
      this.categoriepieces = categoriepieces;
    });
  }

  generateCodePiece(): void {
    this.pieceRechangeService.getAllPiecesRechanges().subscribe((piecesRechange) => {
      const lastPiece = piecesRechange[piecesRechange.length - 1];
      const lastCode = lastPiece ? lastPiece.codePiece : 'code-00';
      const lastNumber = parseInt(lastCode.split('-')[1]);
      this.lastCodeNumber = lastNumber;
      const newCode = `code-${(this.lastCodeNumber + 1).toString().padStart(2, '0')}`;
      this.pieceRechangeForm.patchValue({ codePiece: newCode });
    });
  }
  getCategoriespieces(): Observable<CategoriePiece[]> {
    return this.http.get<CategoriePiece[]>(this.apiServerUrl + '/categoriespieces/all');
  }

  onFormSubmit(): void {
    if (this.pieceRechangeForm.invalid) {
      this.toastService.error({ detail: 'Erreur', summary: 'Veillez remplir le formulaire de nouveau', duration: 3000 });
    } else {
    if (this.pieceRechangeForm.valid) {
      // Votre logique de soumission de formulaire ici
      if (this.data) {
        this.pieceRechangeService.updatePieceRechange(
          this.data,
          this.data.id,
          this.pieceRechangeForm.value.desPiece,
          this.pieceRechangeForm.value.prixAchat,
          this.pieceRechangeForm.value.tauxTVA,
          this.pieceRechangeForm.value.categoriePiece

        ).subscribe({
          next: () => {
            alert('Pièce de rechange modifiée avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.pieceRechangeService.addPieceRechange(this.pieceRechangeForm.value).subscribe({
          next: () => {
            alert('Pièce de rechange ajoutée avec succès');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }}


  //prix ne peut pas etre négative 
  validateNegativePrice(control: FormControl): { [key: string]: boolean } {
    if (control.value < 0) {
      return { negativePrice: true };
    }
    return {};
  }
  }


