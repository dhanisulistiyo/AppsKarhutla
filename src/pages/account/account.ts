import { LoginPage } from "./../login/login";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { NgZone } from "@angular/core";
import { AuthServiceProvider } from "../../providers/auth-service";
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    public auth: AuthServiceProvider
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AccountPage");
  }

  goLogout = () => {
    this.auth.destroyUserCredentials();
    this.zone.run(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  };
}
