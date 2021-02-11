import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuctionsComponent } from './auctions/auctions.component';

const routes: Routes = [
  { path: '', redirectTo: 'auctions', pathMatch: 'full' },
  {
    path: 'auctions',
    component: AuctionsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: 'auctions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
