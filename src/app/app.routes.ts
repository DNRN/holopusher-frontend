import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MarketComponent } from './market/market.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'market', component: MarketComponent}
];
