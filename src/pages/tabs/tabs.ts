import { Component } from "@angular/core";

import { ListDataPage } from "../list-data/list-data";
import { MapsPatroliPage } from "../maps-patroli/maps-patroli";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = MapsPatroliPage;
  tab2Root = ListDataPage;

  constructor() {}
}
