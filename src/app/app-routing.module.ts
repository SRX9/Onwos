import { NgModule, PlatformRef } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SeasondetailComponent } from './seasondetail/seasondetail.component';
import { PlayComponent } from './play/play.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'show/:showid',
    component: ShowDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile/:userid',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'season/:seasonid',
    component: SeasondetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'play/:showname/:seasonid/:eid',
    component: PlayComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
