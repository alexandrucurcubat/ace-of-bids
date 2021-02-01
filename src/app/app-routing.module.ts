import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionsClosedComponent } from './auctions/auctions-closed/auctions-closed.component';
import { AuctionsLiveComponent } from './auctions/auctions-live/auctions-live.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'auctions/live', pathMatch: 'full' },
  {
    path: 'auctions/live',
    component: AuctionsLiveComponent,
  },
  {
    path: 'auctions/closed',
    component: AuctionsClosedComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  { path: '**', redirectTo: 'auctions/live' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
