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
            'titleColor': '#fff',
            'icon': {'color': '#fff', 'name': 'fa fa-tablet', 'size': 35}
        }, {
            'title': 'iMac',
            'color': '#f16729',
            'titleColor': '#fff',
            'icon': {'color': '#fff', 'name': 'fa fa-laptop', 'size': 35}
        }, {
            'title': 'iPhone',
            'color': '#f89322',
            'titleColor': '#fff',
            'icon': {'color': '#fff', 'name': 'fa fa-mobile', 'size': 35}
        }, {
            'title': 'iWatch',
            'color': '#ffcf14',
            'titleColor': '#fff',
            'icon': {'color': '#fff', 'name': 'fa fa-clock-o', 'size': 35}
        }
    ];

    private options: any;
    private button: any;
    private gutter: any;

    constructor() {
    }

    ngOnInit(): void {
        if(window.innerWidth < 450) {
            this.options = {
                radius: 150,
                offset: 15,
            };

            this.button = {
                width: 40,
                fontSize: '10px'
            };

            this.gutter = {
                top: 30
            }
        }
    }
}
