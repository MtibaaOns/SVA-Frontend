import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocieteComponent } from './parametrages/societe/societe.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SpecialiteComponent } from './parametrages/specialite/specialite.component';
import { UtilisateurComponent } from './parametrages/utilisateur/utilisateur.component';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { AjouterClientComponent } from './liste-client/ajouter-client/ajouter-client.component';
import { AjouterContratComponent } from './Contrat/ajouter-contrat/ajouter-contrat.component';
import { ListeContratComponent } from './Contrat/liste-contrat/liste-contrat.component';
import { AjouterDemandeComponent } from './Demande_intervention/ajouter-demande/ajouter-demande.component';
import { ListeDemandeComponent } from './Demande_intervention/liste-demande/liste-demande.component';

import { ListeCategoriePieceComponent } from './CategoriePiece/liste-categorie-piece/liste-categorie-piece.component';
import { ListeDepotComponent } from './Depot/liste-depot/liste-depot.component';
import { ListePieceRechangeComponent } from './PieceRechange/liste-piece-rechange/liste-piece-rechange.component';
import { AjouterPieceRechangeComponent } from './PieceRechange/ajouter-piece-rechange/ajouter-piece-rechange.component';
import { ListeCauseComponent } from './Cause/liste-cause/liste-cause.component';

import { ListeInterventionComponent } from './Interventions/liste-intervention/liste-intervention.component';
import { AjouterInterventionComponent } from './Interventions/ajouter-intervention/ajouter-intervention.component';


import { AjouterFactureComponent } from './Facture/ajouter-facture/ajouter-facture.component';
import { ListeFactureComponent } from './Facture/liste-facture/liste-facture.component';


const routes: Routes = [
 
  {path:"societe", component:SocieteComponent},
  {path:"sidenav",component:SidenavComponent},
  {path:"specialite",component:SpecialiteComponent},
  {path:"utilisateur",component:UtilisateurComponent},
  {path:"categorie_piece",component:ListeCategoriePieceComponent},
  {path:"piece_rechange",component:ListePieceRechangeComponent},
  {path:"categorie-piece",component:ListeCategoriePieceComponent},
  {path:"depot",component:ListeDepotComponent},
  {path:"cause",component:ListeCauseComponent},

  {path:"ajouter_piece",component:AjouterPieceRechangeComponent},

  {path:"ajouter_client",component:AjouterClientComponent},
  {path:'liste_client', component:ListeClientComponent},
  { path: "update_client/:id", component: AjouterClientComponent },


  {path:"ajouter_contrat", component:AjouterContratComponent},
  {path:"liste_contrat",component:ListeContratComponent},
  {path: "update_contrat/:numcontrat", component: AjouterContratComponent },


  {path:"ajouter_demande",component:AjouterDemandeComponent},
  {path:"liste_demande",component:ListeDemandeComponent},
  {path: "update_demande/:numDem", component: AjouterDemandeComponent },

  {path:"ajouter_intervention",component:AjouterInterventionComponent},
  {path:"liste_interventions",component:ListeInterventionComponent},
  {path: "update_intervention/:id", component: AjouterInterventionComponent },



  
  {path:"ajouter_facture",component:AjouterFactureComponent},
  {path:"liste_facture",component:ListeFactureComponent},
  {path: "update_facture/:id", component: AjouterFactureComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
