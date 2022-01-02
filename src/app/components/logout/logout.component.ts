import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from 'src/app/models/login.model';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

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
    localStorage.removeItem('access_token');

    let loginModel: Login = new Login();
    loginModel.userName = this.decodedToken.userName;
    loginModel.password = this.decodedToken.password;

    this._SonCaroApi.logout(loginModel).subscribe((result: any) => {
      this.openSnackBar("Đăng xuất thành công!");
    }, (error) => {
      this.openSnackBar("Đăng xuất không thành công!");
    });
   }
  
  ngOnInit(): void {
    
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
}
