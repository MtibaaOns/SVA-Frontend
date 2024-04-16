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
import { ClientComponent } from './client/client.component';

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
    ClientComponent
 
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
    MatCardModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
