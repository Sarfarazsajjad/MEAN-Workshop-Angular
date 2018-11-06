import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private authListner = new Subject<boolean>();
  private authenticated:boolean = false;
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {}

  getAuthenticationListener() {
    return this.authListner.asObservable();
  }
  getToken() {
    return this.token;
  }
  isAutenticated(){
    return this.authenticated;
  }
  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response);
        if(response.token){
          this.token = response.token;
          this.setAuthTimer(response.expiresIn);
          this.authenticated = true;
          this.authListner.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime()+ response.expiresIn * 1000 )
          this.saveAuthData(this.token,expirationDate);

          this.router.navigate(['/']);
        }
      });
  }

  logout(){
    this.token = null;
    this.authenticated = false;
    this.authListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthDataFromStorage();
    if(!authInformation){
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn>0){
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn/1000);
      this.authenticated = true;
      this.authListner.next(true);
    }
  }

  private setAuthTimer(time){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },time*1000)
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthDataFromStorage():{token:string,expirationDate:Date}{
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if(!token && !expirationDate){
      return null;
    }
    
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
