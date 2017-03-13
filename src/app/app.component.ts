/**
 * app.component
 */

import { Component, OnInit } from "@angular/core";

import '../sass/main.scss';

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    private wings = [
        {
            'title': 'iPad',
            'color': '#ea2a29',
            'icon': {'name': 'fa fa-tablet'}
        }, {
            'title': 'iMac',
            'color': '#f16729',
            'icon': {'name': 'fa fa-laptop'}
        }, {
            'title': 'iPhone',
            'color': '#f89322',
            'icon': {'name': 'fa fa-mobile'}
        }, {
            'title': 'iWatch',
            'color': '#ffcf14',
            'icon': {'name': 'fa fa-clock-o'}
        }
    ];

    private options: any = {
        font: 'Baloo Bhaina, cursive',
        spinable: true,
    };

    private gutter: any;

    constructor() {
    }

    ngOnInit(): void {
        if(window.innerWidth < 450) {
            this.options = {
                font: 'Baloo Bhaina, cursive',
                spinable: true,
                radius: 150,
                offset: 15,
                wingFontSize: 12,
                wingIconSize: 25,
                buttonWidth: 40,
                buttonFontSize: '10px',
            };

            this.gutter = {
                top: 30
            }
        }
    }
}
