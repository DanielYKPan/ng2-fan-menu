/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { FanMenuModule } from 'ng2-fan-menu';
import { ColorPickerModule } from 'angular2-color-picker';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FanMenuModule,
        ColorPickerModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}

