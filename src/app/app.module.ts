import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SonCaroApi } from './services/son-caro-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RoomComponent } from './components/room/room.component';
import { ConfirmFormComponent } from './components/confirm-form/confirm-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatchComponent } from './components/match/match.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SonCaroRealtime } from './services/son-caro-realtime.service';
import { NavComponent } from './components/nav/nav.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    LogoutComponent,
    NavComponent,
    MainLayoutComponent,
    RoomComponent,
    MatchComponent,
    ConfirmFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    SonCaroApi,
    SonCaroRealtime
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
