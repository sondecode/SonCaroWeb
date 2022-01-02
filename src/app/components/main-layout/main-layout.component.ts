import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from 'src/app/models/login.model';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  public name: string = '';
  public decodedToken: any;
  
  constructor(
    private _jwtHelperService: JwtHelperService,
    private _router: Router,
    private _SonCaroApi: SonCaroApi,
    private _snackBar: MatSnackBar
  ) {
    const token = localStorage.getItem('access_token')?.toString();
    this.decodedToken = this._jwtHelperService.decodeToken(token);
   }
  
  ngOnInit(): void {
    
  }

  public goToNav = (url: string) => this._router.navigate([`/${url}`]);

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
}
