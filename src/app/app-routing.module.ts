import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { UserHomeComponent } from './components/home/user-home/user-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'user',
    component: UserHomeComponent
  },
  {
    path: 'creator',
    loadChildren: './components/creator/creator.module#CreatorModule'
  },
  {
    path: 'participant',
    loadChildren: './components/participant/participant.module#ParticipantModule'
  },
  {
    path: 'moderator',
    loadChildren: './components/moderator/moderator.module#ModeratorModule'
  },
  {
    path: '**',
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
