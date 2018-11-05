import { AccountPage } from "./../account/account";
import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { ListDataPage } from "../list-data/list-data";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ListDataPage;
  tab3Root = AccountPage;

  constructor() {}
}
