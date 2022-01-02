import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { User } from 'src/app/models/user.model';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';
import { MatDialog }  from '@angular/material/dialog';
import { ConfirmFormComponent } from '../confirm-form/confirm-form.component';
import { SonCaroRealtime } from 'src/app/services/son-caro-realtime.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  
  public users: User[] = [];

  public rooms: Room[] = [];

  public observerMessageSubcription: Subscription | undefined;

  public decodedToken: any;
  
  constructor(
    private _SonCaroApi: SonCaroApi,
    private _SonCaroRealtime: SonCaroRealtime,
    private _snackBar: MatSnackBar,
    private _matdialog: MatDialog,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,) { 
      this.getUsers();
      this.getRooms();

      const token = localStorage.getItem('access_token')?.toString();

      this.decodedToken = this._jwtHelperService.decodeToken(token);
  }
  
  public getUsers() {
    this._SonCaroApi.getUsers().subscribe((users: any) => {

      this.users = <User[]>users;
      this.users = this.users?.filter(x => x.status === true);
    },
      (error) => {
        this.openSnackBar(error);
      });
  }

  public getRooms() {
    this._SonCaroApi.getRooms().subscribe((rooms: any) => {

      this.rooms = <Room[]>rooms;
    }, (error) => {
      this.openSnackBar(error);
    });
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
  
  public openConfirmDialog(room: Room) {
    const dialogRef = this._matdialog.open(ConfirmFormComponent).afterClosed().subscribe((isAgree: boolean) => {
      if (!isAgree)
        return;
      // đã đồng ý
      localStorage.setItem('roomId', room.id);
      localStorage.setItem('userId', this.decodedToken.id);
      this._SonCaroApi.joinRoom(this.decodedToken.id, room.id).subscribe((result: any) => {
        this.goToNav('main/match');
      }, (error) => {
        this.openSnackBar(error);
      });
    });

  }


  public goToNav = (url: string) => this._router.navigate([`/${url}`]);

  ngOnDestroy(): void {
    this.observerMessageSubcription?.unsubscribe();
  }

  ngOnInit(): void {
    this.onMessageListener();
  }

  public onMessageListener() {
    this.observerMessageSubcription = this._SonCaroRealtime.messageSource.asObservable().subscribe((data: any) => {
      this.users = data;
      this.users = this.users?.filter(x => x.status === true);
    });
  }

}
