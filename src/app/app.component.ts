import { Component, QueryList, ViewChildren } from '@angular/core';

import {
  Platform,
  IonRouterOutlet,
  ModalController,
  ToastController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.backButtonEvent();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === '/tabs/home' ||
          this.router.url === '/tabs/nearBy' ||
          this.router.url === '/tabs/profile' ||
          this.router.url === '/tabs/notification' ||
          this.router.url === '/tabs/appoinment' ||
          this.router.url === '/starter' ||
          this.router.url === '/sign-in'
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator['app'].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: 'press back again to exit App.',
      duration: 2000
    });
    toast.present();
  }
}
