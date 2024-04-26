import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DepotService } from '../depot.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Depot } from '../depot.model';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ajouter-depot',
  templateUrl: './ajouter-depot.component.html',
  styleUrls: ['./ajouter-depot.component.css']
})
export class AjouterDepotComponent implements OnInit {
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  depotForm!: FormGroup;
  public depotIdUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private depotService: DepotService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.depotForm = this._fb.group({
      id: [''],
      codeDep: [''],
      libDep: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.depotIdUpdate = val['id'];
      if (this.depotIdUpdate) {
        this.isUpdateActive = true;
        this.depotService.getDepotById(this.depotIdUpdate).subscribe({
          next: (depot) => {
            this.fillFormToUpdate(depot);
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.generateCodeDep();
      }
    });
  }

  generateCodeDep() {
    this.depotService.getAllDepots().subscribe((depots) => {
      const lastDepot = depots[depots.length - 1];
      const lastCodeDep = lastDepot ? lastDepot.codeDep : 'dep-00';
      const lastNumber = parseInt(lastCodeDep.split('-')[1]);
      const newCodeDep = `dep-${(lastNumber + 1).toString().padStart(2, '0')}`;
      this.depotForm.patchValue({ codeDep: newCodeDep });
    });
  }

  onFormSubmit() {
    this.depotService.addDepot(this.depotForm.value).subscribe({
      next: (res) => {
        this.toastService.success({ detail: "Succès", summary: "Dépôt ajouté", duration: 3000 });
        this.depotForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
  modifier() {
    const { id, codeDep, libDep } = this.depotForm.value;
    const depot: Depot = { id, codeDep, libDep };
  
    this.depotService.updateDepot(depot,id,libDep)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du dépôt ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_depot']);
        this.depotForm.reset();
      });
  }

  fillFormToUpdate(depot: Depot) {
    this.depotForm.patchValue({
      id: depot.id,
      codeDep: depot.codeDep,
      libDep: depot.libDep,
    });
  }
}