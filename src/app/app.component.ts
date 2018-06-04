import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Router } from "@angular/router";
import { constructDependencies } from "@angular/core/src/di/reflective_provider";
import { STORE_FEATURES } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: { "(window:keydown)": "hotkeys($event)" }
})
export class AppComponent implements OnInit {
  public companyName: string;
  public ownerName: string;
  public navAllowed: Boolean = false;
  // Set toastr container ref configuration for toastr positioning on screen
  constructor(
    public toastr: ToastsManager,
    vRef: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vRef);
    // console.log(
    //   '%c%s',
    //   'color: green; background: cyan; font-size: 32px;',
    //   'Well aadii104 is trying to make things better here,
    // let him know him you are looking for something ( try not to start somehthing your own)'
    // );
  }
  ngOnInit() {
    this.getRouteParam();
  }

  getRouteParam() {
    const splitPath = window.location.pathname.split("/");
    // Some browsers (including chrome) return the path with a leading /, remove it if exists.
    const sanitizedSplitPath =
      splitPath[0] === "" ? splitPath.slice(1) : splitPath;
    if (sanitizedSplitPath.length > 2) {
      this.navAllowed = true;
      this.ownerName = sanitizedSplitPath[0].split("%20").join(" ");
      this.companyName = sanitizedSplitPath[1].split("%20").join(" ");
    } else this.navAllowed = false;
  }
  changeOfRoutes() {
    this.getRouteParam();
  }
  hotkeys(event) {
    if (this.navAllowed === true && event.altKey) {
      switch (event.keyCode) {
        case 76:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/ledger`
          ]);
          break;
        case 84:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/productservice`
          ]);
          break;
        case 83:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/sales`
          ]);
          break;
        case 68:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/salesreturn`
          ]);
          break;
        case 80:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/purchase`
          ]);
          break;
        case 67:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/purchasereturn`
          ]);
          break;
        case 82:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/contra`
          ]);
          break;
        case 73:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/receipt`
          ]);
          break;
        case 79:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/payment`
          ]);
          break;
        case 74:
          this.router.navigate([
            `/${this.ownerName}/${this.companyName}/form/journal`
          ]);
          break;
      }
    }
  }
}
