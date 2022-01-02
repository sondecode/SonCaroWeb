import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RoomComponent } from './components/room/room.component';
import { MatchComponent } from './components/match/match.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main',  // domain/main/
    component: MainLayoutComponent,
    children:
      [
        {
          path: '',
          component: RoomComponent
        },
        {
          path: 'room',
          component: RoomComponent
        },
        {
          path: 'match',
          component: MatchComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
