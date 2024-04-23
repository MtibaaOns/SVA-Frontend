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

const routes: Routes = [
 
  {path:"societe", component:SocieteComponent},
  {path:"sidenav",component:SidenavComponent},
  {path:"specialite",component:SpecialiteComponent},
  {path:"utilisateur",component:UtilisateurComponent},
  {path:"ajouter_client",component:AjouterClientComponent},
  {path:'liste_client', component:ListeClientComponent},


  { path: "update_client/:id", component: AjouterClientComponent },
  {path:"ajouter_contrat", component:AjouterContratComponent},
  {path:"liste_contrat",component:ListeContratComponent},
  {path: "update_contrat/:numcontrat", component: AjouterContratComponent },
  {path:"ajouter_demande",component:AjouterDemandeComponent},
  {path:"liste_demande",component:ListeDemandeComponent},
  {path: "update_demande/:numDem", component: AjouterDemandeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
