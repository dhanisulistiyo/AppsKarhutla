import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  MenuController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TabsPage } from "../tabs/tabs";
import { NgZone } from "@angular/core";
import { AuthServiceProvider } from "../../providers/auth-service";
import { ConfigProvider } from "../../providers/config";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private LoginUser: FormGroup;
  password = "password";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    public auth: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public conf: ConfigProvider,
    public menuCtrl: MenuController
  ) {
    this.LoginUser = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false, "myMenu");
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.display = "none";
      });
    }
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true, "myMenu");
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.display = "flex";
      });
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
  showHide = () => {
    if (this.password == "password") this.password = "text";
    else this.password = "password";
  };

  authLogin = () => {
    console.log(this.LoginUser.value);
    let loading = this.loadingCtrl.create({
      content: "Loading Please Wait...",
      enableBackdropDismiss: true
    });
    loading.present();
    this.auth.login(this.LoginUser.value).subscribe(
      data => {
        console.log(data.data);
        this.auth.storeUserCredentials(data.data.token);
        loading.dismiss();
        this.zone.run(() => {
          this.navCtrl.setRoot(TabsPage);
        });
      },
      err => {
        console.log(err);
        if (err.status == 401)
          this.conf.showAllert("Failed!", "Email dan Password salah!");
        else this.conf.showAllert("Failed!", "Masalah koneksi!");
        loading.dismiss();
      }
    );
  };
}
