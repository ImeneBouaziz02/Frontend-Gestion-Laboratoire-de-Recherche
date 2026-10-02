import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MemberFormComponent } from './member-form/member-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { TemplateComponent } from './template/template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolComponent } from './tool/tool.component';
import { ArticleComponent } from './article/article.component';
import { EvtComponent } from './evt/evt.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { EventCreateComponent } from './event-create/event-create.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from 'src/environment';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { MatChipsModule } from '@angular/material/chips';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    DashboardComponent,
    ToolComponent,
    ArticleComponent,
    EvtComponent,
    EventCreateComponent,
    LoginComponent,
    ToolFormComponent,
    ArticleFormComponent  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NgChartsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule, // pour les formulaires
    MatInputModule,
    ReactiveFormsModule, //pr travailler avec les formulaires
    FormsModule,
    MatDialogModule, //pr confirm dialog de delete
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
    AngularFireModule.initializeApp(firebaseConfig), //initialisation de firebase
    AngularFireAuthModule //module d'authentification
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  bootstrap: [AppComponent] //lancer le compsant racine"s, principal
})
export class AppModule { }
