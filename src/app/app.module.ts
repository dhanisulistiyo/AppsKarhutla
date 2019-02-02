import { KamusPage } from "./../pages/kamus/kamus";
import { MapsPatroliPage } from "./../pages/maps-patroli/maps-patroli";
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
import { CurrentLocationPage } from "../pages/current-location/current-location";
import { FunctionServiceProvider } from "../providers/function-service";
import { InputDataServiceProvider } from "../providers/input-data-service";
import { KamusServiceProvider } from "../providers/kamus-service";
import { DetailKamusPage } from "../pages/detail-kamus/detail-kamus";

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
    MapsPatroliPage,
    KamusPage,
    DetailKamusPage
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
    CurrentLocationPage,
    MapsPatroliPage,
    KamusPage,
    DetailKamusPage
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
    AuthServiceProvider,
    FunctionServiceProvider,
    InputDataServiceProvider,
    KamusServiceProvider
  ]
})
export class AppModule {}
