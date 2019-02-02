
import { ConfigProvider } from "./../providers/config";
import { GeneralServiceProvider } from "./../providers/general-service";
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { AuthServiceProvider } from "../providers/auth-service";
import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";
import { KamusPage } from "../pages/kamus/kamus";

@Component({
  selector: "page-app",
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string; component: any; icon: any }>;
  user = null;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthServiceProvider,
    public gen: GeneralServiceProvider,
    public conf: ConfigProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Patroli", component: TabsPage, icon: "ios-home-outline" },
      {
        title: "Sipongi Live Update",
        component: HomePage,
        icon: "ios-bonfire-outline"
      },
      {
        title: "Kamus Istilah",
        component: KamusPage,
        icon: "ios-book-outline"
      },
      { title: "Logout", component: null, icon: "ios-log-out-outline" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      // set status bar to white
      this.statusBar.styleDefault();

      this.splashScreen.hide();
      this.auth.loadUserCredentials();
      if (this.auth.AuthToken == null || this.auth.AuthToken == undefined) {
        this.rootPage = LoginPage;
      } else {
        this.gen.checkToken().then(
          data => {
            console.log(data);
            if (data.status == 401) {
              this.rootPage = LoginPage;
              this.conf.showAllert("Failed", "Token Expired");
            } else if (data.status == 0 || data.status > 401) {
              this.rootPage = LoginPage;
              this.conf.showAllert("Failed", "Connection Problem");
            } else {
              this.gen.getAllData();
              this.user = this.auth.User;
              console.log(this.user);
              this.rootPage = TabsPage;
            }
          },
          err => {
            this.rootPage = LoginPage;
            console.log(err);
          }
        );
      }
    });
  }

  openPage(page) {
    if (page.component != null) this.nav.setRoot(page.component);
    else {
      this.auth.destroyUserCredentials();
      this.nav.setRoot(LoginPage);
    }
  }
}
