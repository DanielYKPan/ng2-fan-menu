/**
 * app.module
 */

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuModule } from './menu';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MenuModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
