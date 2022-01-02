import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";

@Injectable({
    providedIn: 'root'
})
export class SonCaroApi {
    constructor (private http: HttpClient,){}

    public postRegisterUser = (registerModel: Register) => this.http.post(`${environment.caroDomain}/api/User/register`, registerModel, { responseType: 'text' });


    public postLoginUser = (loginModel: Login) => this.http.post(`${environment.caroDomain}/api/User/login`, loginModel, { responseType: 'text' });
  
    public getUsers = () => this.http.get(`${environment.caroDomain}/api/User`);
  
    public logout = (loginModel: Login) => this.http.post(`${environment.caroDomain}/api/User/logout`, loginModel, { responseType: 'text' });
  
  
    public getRooms = () => this.http.get(`${environment.caroDomain}/api/Room`);
  
    public joinRoom = (userId: string, roomId: string) => this.http.post(`${environment.caroDomain}/api/UserRoom`,
      { userId: userId, roomId: roomId }
    );

    public leaveRoom = (userId: string, roomId: string) => this.http.delete(`${environment.caroDomain}/api/UserRoom/${userId}/${roomId}`, { responseType: 'text' });

    public sendMessage = (userId: any, roomId: any, message: any) => this.http.post(`${environment.caroDomain}/api/Chat/message-user`, { userId: userId, roomId: roomId , message: message});
}
