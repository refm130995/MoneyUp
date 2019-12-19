import { FilterPageModule } from './pages/filter/filter.module';
import { BookingSuccessfullyPageModule } from './pages/booking-successfully/booking-successfully.module';
import { CodeSendModalPageModule } from './pages/code-send-modal/code-send-modal.module';
import { ImageModalPageModule } from './pages/image-modal/image-modal.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NearSalonListPageModule } from './pages/near-salon-list/near-salon-list.module';
import { SharePageModule } from './pages/share/share.module';
import { EnableLocationPageModule } from './pages/enable-location/enable-location.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ImageModalPageModule,
    CodeSendModalPageModule,
    BookingSuccessfullyPageModule,
    NearSalonListPageModule,
    SharePageModule,
    EnableLocationPageModule,
    FilterPageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
