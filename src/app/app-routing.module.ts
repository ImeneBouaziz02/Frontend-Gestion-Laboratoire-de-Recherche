import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvtComponent } from './evt/evt.component';
import { ToolComponent } from './tool/tool.component';
import { LoginComponent } from './login/login.component';

// l'ordre intervient
const routes: Routes = [
  {
      path: 'login',
      pathMatch: 'full',
      component: LoginComponent
    },
    {
    //fel path mat7ottech / yaamelha wahdou
    path: 'create',
    // methode de verouillage de routes
    pathMatch: 'full',
    component: MemberFormComponent

  },{
      path: 'member',
      pathMatch: 'full',
      component: MemberComponent
    },
    {
      //valeur dynamique id qui change selon le membre
      // {{id}} nous donne le terme
    path: ':id/edit',
    pathMatch: 'full',
    component: MemberFormComponent   
    },
    {
      path: 'articles',
      pathMatch: 'full',
      component: ArticleComponent
    },
    {
      path: 'dashboard',
      pathMatch: 'full',
      component: DashboardComponent
    },
    {
      path: 'events',
      pathMatch: 'full',
      component: EvtComponent
    },
    {
      path: 'tools',
      pathMatch: 'full',
      component: ToolComponent
    },
    {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
    },
    {
      //** means n'impporte quel path autre que les autre sités ci dessus */
      path: '**',
      component: MemberComponent

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

