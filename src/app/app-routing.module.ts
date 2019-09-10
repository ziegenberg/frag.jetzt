import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { UserHomeComponent } from './components/home/user-home/user-home.component';
import { ImprintComponent } from './components/home/_dialogs/imprint/imprint.component';
import { DataProtectionComponent } from './components/home/_dialogs/data-protection/data-protection.component';
import { HelpPageComponent } from './components/shared/_dialogs/help-page/help-page.component';
import { paths } from './app-paths';
import { PathResolveService } from './services/http/path-resolve.service';
import { LayoutComponent } from './components/shared/layout/layout.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: paths.home,
        pathMatch: 'full'
      },
      {
        path: paths.home,
        component: HomePageComponent
      },
      {
        path: paths.home,
        component: HomePageComponent
      },
      {
        path: paths.user,
        component: UserHomeComponent
      },
      {
        path: 'imprint',
        component: ImprintComponent
      },
      {
        path: 'data-protection',
        component: DataProtectionComponent
      },
      {
        path: 'help-page',
        component: HelpPageComponent
      },
      {
        path: 'creator',
        loadChildren: './components/creator/creator.module#CreatorModule'
      },
      {
        path: paths.participant,
        loadChildren: './components/participant/participant.module#ParticipantModule'
      },
      {
        path: 'moderator',
        loadChildren: './components/moderator/moderator.module#ModeratorModule'
      }
    ]
  },
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
