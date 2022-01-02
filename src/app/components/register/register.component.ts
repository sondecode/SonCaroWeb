import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register.model';
import { Router } from '@angular/router';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public registerModel!: Register;

  constructor(
    private _snackBar: MatSnackBar,
    private _sonCaroApi: SonCaroApi,
    private _router: Router  
  ) {
    this.registerModel = new Register();
  }

  ngOnInit() {
  }

  public async registerUserClick() {
    let registerResponse: any = await this.registerUser();
    this.openSnackBar(registerResponse.message);

    if (400 === registerResponse.statusCode) {
      return;
    }

    localStorage.setItem('user_name_register', this.registerModel.userName);
    localStorage.setItem('password_register', this.registerModel.password);
    localStorage.setItem('loading_register', 'true');

    this.goToNav('signin');
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000
    });
  }
  
  public registerUser() {
    return new Promise<any>((resolve, reject) => {
      this._sonCaroApi.postRegisterUser(this.registerModel).subscribe((response: any) => {
        // khi mà đăng kí thành công 
        resolve({
          statusCode: 200,
          message: response
        });

      }, (error) => {
        // lỗi thì làm gì?
        resolve({
          statusCode: 400,
          message: error
        });
      })
    });
  }

  public goToNav = (url: string) =>  this._router.navigate([`/${url}`]);
}