/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FanMenuModule } from './menu';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FanMenuModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
