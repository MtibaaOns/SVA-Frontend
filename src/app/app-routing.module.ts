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
import { AjouterInterventionComponent } from './Intervention/ajouter-intervention/ajouter-intervention.component';
import { ListeInterventionComponent } from './Intervention/liste-intervention/liste-intervention.component';
import { AjouterCategoriePieceComponent } from './CategoriePiece/ajouter-categorie-piece/ajouter-categorie-piece.component';
import { ListeCategoriePieceComponent } from './CategoriePiece/liste-categorie-piece/liste-categorie-piece.component';
import { AjouterDepotComponent } from './Depot/ajouter-depot/ajouter-depot.component';
import { ListeDepotComponent } from './Depot/liste-depot/liste-depot.component';

const routes: Routes = [
 
  {path:"societe", component:SocieteComponent},
  {path:"sidenav",component:SidenavComponent},
  {path:"specialite",component:SpecialiteComponent},
  {path:"utilisateur",component:UtilisateurComponent},
  {path:"ajouter_client",component:AjouterClientComponent},
  {path:'liste_client', component:ListeClientComponent},
  {path:"categorie_piece",component:ListeCategoriePieceComponent},


  { path: "update_client/:id", component: AjouterClientComponent },
  {path:"ajouter_contrat", component:AjouterContratComponent},
  {path:"liste_contrat",component:ListeContratComponent},
  {path: "update_contrat/:numcontrat", component: AjouterContratComponent },
  {path:"ajouter_demande",component:AjouterDemandeComponent},
  {path:"liste_demande",component:ListeDemandeComponent},
  {path: "update_demande/:numDem", component: AjouterDemandeComponent },

  {path:"ajouter_intervention",component:AjouterInterventionComponent},
  {path:"liste_intervention",component:ListeInterventionComponent},
  {path: "update_intervention/:codeinterv", component: AjouterInterventionComponent },

  {path:"ajouter_categorie_piece",component:AjouterCategoriePieceComponent},
  {path:"liste_categorie_piece",component:ListeCategoriePieceComponent},
  {path: "update_categorie_piece/:id", component: AjouterCategoriePieceComponent },


  {path:"ajouter_depot",component:AjouterDepotComponent},
  {path:"liste_depot",component:ListeDepotComponent},
  {path: "update_depot/:id", component: AjouterDepotComponent }










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
