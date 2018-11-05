import { Http, Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { ConfigProvider } from "./config";
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
    AuthToken = null;
    constructor(public http: Http, public conf: ConfigProvider) {
        console.log('Hello AuthServiceProvider Provider');
    }

    storeUserCredentials(token) {
        window.localStorage.setItem('token', token);
        this.AuthToken = token;
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('token');
        this.storeUserCredentials(token)
    }

    login(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.conf.baseUrl + '/api/auth/login';
        var response = this.http.post(url, user, { headers: headers }).map(res => res.json());
        return response;
    }

    destroyUserCredentials() {
        this.AuthToken = null;
        localStorage.removeItem('token');
    }

}
