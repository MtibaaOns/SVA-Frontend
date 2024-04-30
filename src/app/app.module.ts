import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParametragesComponent } from './parametrages/parametrages.component';
import { SocieteComponent } from './parametrages/societe/societe.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import{MatButtonModule}from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { SocAddEditComponent } from './parametrages/societe/soc-add-edit/soc-add-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatCardModule} from '@angular/material/card';
import { SpecialiteComponent } from './parametrages/specialite/specialite.component';
import { SpecAddEditComponent } from './parametrages/specialite/spec-add-edit/spec-add-edit.component';
import { UtilisateurComponent } from './parametrages/utilisateur/utilisateur.component';
import { UtilAddEditComponent } from './parametrages/utilisateur/util-add-edit/util-add-edit.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { AjouterClientComponent } from './liste-client/ajouter-client/ajouter-client.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AjouterContratComponent } from './Contrat/ajouter-contrat/ajouter-contrat.component';
import { ListeContratComponent } from './Contrat/liste-contrat/liste-contrat.component';
import { AjouterDemandeComponent } from './Demande_intervention/ajouter-demande/ajouter-demande.component';
import { ListeDemandeComponent } from './Demande_intervention/liste-demande/liste-demande.component';




import {MatSelectModule} from '@angular/material/select';
import { AjouterCategoriePieceComponent } from './CategoriePiece/ajouter-categorie-piece/ajouter-categorie-piece.component';
import { ListeCategoriePieceComponent } from './CategoriePiece/liste-categorie-piece/liste-categorie-piece.component';
import { ListeDepotComponent } from './Depot/liste-depot/liste-depot.component';
import { AjouterDepotComponent } from './Depot/ajouter-depot/ajouter-depot.component';
import { AjouterPieceRechangeComponent } from './PieceRechange/ajouter-piece-rechange/ajouter-piece-rechange.component';
import { ListePieceRechangeComponent } from './PieceRechange/liste-piece-rechange/liste-piece-rechange.component';
import { ListeCauseComponent } from './Cause/liste-cause/liste-cause.component';
import { AjouterCauseComponent } from './Cause/ajouter-cause/ajouter-cause.component';
import { AjouterInterventionComponent } from './Interventions/ajouter-intervention/ajouter-intervention.component';
import { ListeInterventionComponent } from './Interventions/liste-intervention/liste-intervention.component';



@NgModule({
  declarations: [
    AppComponent,
    ParametragesComponent,
    SocieteComponent,
    SocAddEditComponent,
    SidenavComponent,
    SpecialiteComponent,
    SpecAddEditComponent,
    UtilisateurComponent,
    UtilAddEditComponent,
    ListeClientComponent,
    AjouterClientComponent,
 
    AjouterContratComponent,
    ListeContratComponent,
    AjouterDemandeComponent,
    ListeDemandeComponent,
    AjouterCategoriePieceComponent,
    ListeCategoriePieceComponent,
    ListeDepotComponent,
    AjouterDepotComponent,
    AjouterPieceRechangeComponent,
    ListePieceRechangeComponent,
    ListeCauseComponent,
    AjouterCauseComponent,
    AjouterInterventionComponent,
    ListeInterventionComponent,



  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    NgToastModule,
    NgConfirmModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatSelectModule
    
     // Imported here
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }