import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './components/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
  ],
})
export class AccountModule {}
