import { AccountPage } from "./../pages/account/account";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { TooltipsModule } from "ionic-tooltips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { LoginPage } from "../pages/login/login";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ConfigProvider } from "../providers/config";
import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { Camera } from "@ionic-native/camera";
import { ListDataPage } from "../pages/list-data/list-data";
import { InputDataKarhutlaPage } from "../pages/input-data-karhutla/input-data-karhutla";
import { DetailsDataPage } from "../pages/details-data/details-data";
import { GeneralServiceProvider } from "../providers/general-service";
import { HttpModule } from "@angular/http";
import { PatroliServiceProvider } from "../providers/patroli-service";
import { AuthServiceProvider } from "../providers/auth-service";
import { LowerCase } from "../pipes/time-helper/time-helper";
import { CurrentLocationPage } from "../pages/current-location/current-location";
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    ListDataPage,
    InputDataKarhutlaPage,
    DetailsDataPage,
    CurrentLocationPage,
    LowerCase
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: "true"
    }),
    HttpModule,
    TooltipsModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    ListDataPage,
    InputDataKarhutlaPage,
    DetailsDataPage,
    CurrentLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    GoogleMaps,
    Geolocation,
    Camera,
    GeneralServiceProvider,
    PatroliServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
