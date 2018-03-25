import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { HoloService } from './holo.service';
import { MarketComponent } from './market/market.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  providers: [HoloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
