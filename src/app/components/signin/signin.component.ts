import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';
import { SonCaroRealtime } from 'src/app/services/son-caro-realtime.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user: Login = new Login();

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _SonCaroApi: SonCaroApi,
    private _SonCaroRealtime: SonCaroRealtime
  ) { 
    //kết nối cổng thời gian thực
    this._SonCaroRealtime.startConnection();
    // Lắng nghe sự thay đổi của user 
    this._SonCaroRealtime.addTransferUserOnlineListener();   

    let loadingRegister = <boolean><unknown>localStorage.getItem('loading_register');

    if (false === loadingRegister)
      return;

    let username = localStorage.getItem('user_name_register')?.toString();
    let password = localStorage.getItem('password_register')?.toString();

    if (null != username) {
      this.user.userName = username ?? this.user.userName;
      this.user.password = password ?? this.user.password;
    }
  }

  ngOnInit() {
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }


  public goToNav = (url: string) => this._router.navigate([`/${url}`]);


  public loginUser = () => {
    this._SonCaroApi.postLoginUser(this.user).subscribe((response: any) => {
      // khi đăng nhập thành công...
      //lưu token vào trong localStorage với key là access_token
      localStorage.setItem('access_token', response);
      this.openSnackBar('Đăng nhập thành công!');
      this.goToNav('main');

    }, (error) => {
      // lỗi thì làm gì?
      this.openSnackBar('Đăng nhập không thành công!');
    })
  };

}
