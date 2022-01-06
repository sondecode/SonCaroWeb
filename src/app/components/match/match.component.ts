import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SonCaroApi } from 'src/app/services/son-caro-api.service';
import { SonCaroRealtime } from 'src/app/services/son-caro-realtime.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  public user = {
    icon: "assets/icon/Creative-Tail-Animal-gorilla.svg",
    name: ""
  }
  public currentRoomName = localStorage.getItem("roomName");
  public firstUser = localStorage.getItem("firstUser");
  public secondUser = localStorage.getItem("secondUser");
  public messages: any[] = [];
  public queuePlayer: User[] = [];

  public tempMessage = "";
  public observerMessageSubcription: Subscription | undefined;
  public observerStepSubcription: Subscription | undefined;

  // ma trận tham chiếu bàn cờ
  public boardChess: any[] = [];
  public currentRoomId = localStorage.getItem('roomId');
  public currentUserId = localStorage.getItem('userId');

  constructor(
    private _SonCaroApi: SonCaroApi,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _SonCaroRealtime: SonCaroRealtime
  ) {
    this._SonCaroRealtime.startConnection();
    this._SonCaroRealtime.addTransferChatOnlineListener();
    for (let i = 0; i < 13; i++) {

      for (let j = 0; j < 20; j++) {
        this.boardChess.push({
          x: i,
          y: j,
          mark: true,
          player: null
        });
      }
    }
   }
  ngOnInit(): void {
    this.onMessageListener();
  }

  public isLogin(): boolean {
    // xử lý gì đó...

    return true;
  }
  
  // Chỉ gọi hàm này trong trường hợp là mình tự đăng lên 1 đoạn chat

  public joinMatch(){
    this._SonCaroApi.joinMatch(this.currentUserId, this.currentRoomId).subscribe(
      (response: any) =>{
        console.log(response);
      },(error: any) => {}
    )

  }

  public sendMessage(event: any) {
    this._SonCaroApi.sendMessage(this.currentUserId, this.currentRoomId, event.target.value).subscribe(
      (response: any) =>{
        this.tempMessage = '';
      },(error: any) => {}
    )
    // let newMessage = {
    //   icon: this.user.icon,
    //   name: "",
    //   content: event.target.value,
    //   owner: this.user.name,
    // }

    // this.messages.push(newMessage); 
    // this.tempMessage = "";
  }
  public onMessageListener(){
    this.observerMessageSubcription = this._SonCaroRealtime.chatSource.asObservable().subscribe((data: any) => {
      //console.log(data);

      let currentRoomId = localStorage.getItem('roomId');
      let currentUserId = localStorage.getItem('userId');

      if (data?.userId == currentUserId && data?.roomId == currentRoomId) {
        let newMessage = {
          icon: this.user.icon,
          name: "",
          content: data.message,
          owner: this.user.name,
        }
    
        this.messages.push(newMessage);
      }

      if (data?.userId != currentUserId && data?.roomId == currentRoomId) {
        let newMessage = {
          icon: this.user.icon,
          name: "",
          content: data.message,
          owner: "Player 2",
        }
    
        this.messages.push(newMessage);
      }
   });
  }


  public funcTest() {
    return "Đây là biểu thức kiểm tra!";
  }

  public leaveRoom() {
    let userId = localStorage.getItem('userId');
    let roomId = localStorage.getItem('roomId');

    if (null == userId || null == roomId) {
      this.openSnackBar('Lỗi!');
      return;
    }

    this._SonCaroApi.leaveRoom(userId, roomId).subscribe((response: any) => {
      this.openSnackBar('Bạn đã rời phòng!');
      this.goToNav('main');
    });
  }

  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }

  public goToNav = (url: string) => this._router.navigate([`/${url}`]);
}
