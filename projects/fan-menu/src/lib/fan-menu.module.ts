import { NgModule } from '@angular/core';
import { FanMenuComponent } from './fan-menu.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuContainerComponent } from './menu-container.component';
import { MenuOptions } from './menu-options.service';
import { MenuWingComponent } from './menu-wing.component';
import { SpinService } from './menu-spin.service';

import 'hammerjs';


@NgModule({
  declarations: [
    MenuContainerComponent,
    MenuWingComponent,
    FanMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FanMenuComponent,
    MenuContainerComponent,
  ],
  providers: [
    MenuOptions,
    SpinService,
  ]
})
export class FanMenuModule { }

