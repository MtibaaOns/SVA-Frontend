import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CategoriePieceService } from '../categorie-piece.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriePiece } from '../categorie-piece.model';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-categorie-piece',
  templateUrl: './ajouter-categorie-piece.component.html',
  styleUrls: ['./ajouter-categorie-piece.component.css']
})
export class AjouterCategoriePieceComponent implements OnInit {
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  categoriePieceForm!: FormGroup;
  public categoriePieceIdUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private categoriePieceService: CategoriePieceService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriePieceForm = this._fb.group({
      id: [''],
      codeCategorie: [''],
      desCategorie: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.categoriePieceIdUpdate = val['id'];
      if (this.categoriePieceIdUpdate) {
        this.isUpdateActive = true;
        this.categoriePieceService.getCategoriePieceById(this.categoriePieceIdUpdate).subscribe({
          next: (categoriePiece) => {
            this.fillFormToUpdate(categoriePiece);
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.generateCodeCategorie();
      }
    });
  }

  generateCodeCategorie() {
    this.categoriePieceService.getAllCategoriesPieces().subscribe((categoriesPieces) => {
      const lastCategoriePiece = categoriesPieces[categoriesPieces.length - 1];
      const lastCodeCategorie = lastCategoriePiece ? lastCategoriePiece.codeCategorie : 'categ-00';
      const lastNumber = parseInt(lastCodeCategorie.split('-')[1]);
      const newCodeCategorie = `categ-${(lastNumber + 1).toString().padStart(2, '0')}`;
      this.categoriePieceForm.patchValue({ codeCategorie: newCodeCategorie });
    });
  }

  onFormSubmit() {
    this.categoriePieceService.addCategoriePiece(this.categoriePieceForm.value).subscribe({
      next: (res) => {
        this.toastService.success({ detail: "Succès", summary: "CategoriePiece ajouté", duration: 3000 });
        this.categoriePieceForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
  modifier() {
    const { id, codeCategorie, desCategorie } = this.categoriePieceForm.value;
    const categoriePiece: CategoriePiece = { id, codeCategorie, desCategorie };
  
    this.categoriePieceService.updateCategoriePiece(categoriePiece,id,desCategorie)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails de la catégorie de pièce ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_categorie_piece']);
        this.categoriePieceForm.reset();
      });
  }

  fillFormToUpdate(categoriePiece: CategoriePiece) {
    this.categoriePieceForm.patchValue({
      id: categoriePiece.id,
      codeCategorie: categoriePiece.codeCategorie,
      desCategorie: categoriePiece.desCategorie,
    });
  }
}