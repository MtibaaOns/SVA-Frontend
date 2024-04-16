import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocieteComponent } from './parametrages/societe/societe.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SpecialiteComponent } from './parametrages/specialite/specialite.component';
import { UtilisateurComponent } from './parametrages/utilisateur/utilisateur.component';

const routes: Routes = [
 
  {path:"societe", component:SocieteComponent},
  {path:"sidenav",component:SidenavComponent},
  {path:"specialite",component:SpecialiteComponent},
  {path:"utilisateur",component:UtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
