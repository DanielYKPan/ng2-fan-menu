/**
 * menu.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MenuContainerComponent } from './menu-container.component';
import { MenuOptions } from './menu-options.service';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        MenuContainerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        MenuContainerComponent,
    ],
    providers: [
        MenuOptions,
    ]
})
export class MenuModule {
}
