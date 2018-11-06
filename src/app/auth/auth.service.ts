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
      .post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response);
        if(response.token){
          this.token = response.token;
          this.authenticated = true;
          this.authListner.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout(){
    this.token = null;
    this.authenticated = false;
    this.authListner.next(false);
    this.router.navigate(['/']);
  }
}
