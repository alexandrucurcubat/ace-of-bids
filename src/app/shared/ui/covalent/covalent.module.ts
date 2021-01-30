import { NgModule } from '@angular/core';
import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

@NgModule({
  exports: [CovalentSearchModule, CovalentDialogsModule],
})
export class CovalentModule {}
