import { dateDataSortValue } from "ionic-angular/util/datetime-util";
import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "./config";
import "rxjs/add/operator/map";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  AuthToken = null;
  User = null;
  constructor(public http: Http, public conf: ConfigProvider) {
    console.log("Hello AuthServiceProvider Provider");
  }

  storeUserCredentials(user) {
    window.localStorage.setItem("auth", JSON.stringify(user));
    this.AuthToken = user.token;
    this.User = user.user[0];
  }

  loadUserCredentials() {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth != null) {
      this.AuthToken = auth["token"];
      this.User = auth["user"][0];
    }
  }

  login(user) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var url = this.conf.baseUrl + "/api/auth/login";
    var response = this.http
      .post(url, user, { headers: headers })
      .map(res => res.json());
    return response;
  }

  destroyUserCredentials() {
    this.AuthToken = null;
    localStorage.removeItem("auth");
  }
}
