/**
 * app.component
 */

import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";

import '../sass/main.scss';

@Component({
    selector: 'yk-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    private defaultOptions: Object = {
        font: 'sans-serif',
        defaultOpen: true, // Open menu automatically on load.
        defaultPosition: 'topLeft', // The menu default position
        radius: 200, // The radius of the menu wings from the center of the button.
        angle: 30, // The angle at which each wing will open
        offset: 25, // The gap between the menu button and the menu item wings.
        showIcons: true, // A flag that determines whether to show icon.
        onlyIcons: false, // A flag that determines whether only show all icons and hide the wing title
        spinable: false, // A flag that determines whether the menu could be spin.
        wingFontSize: 16,
        wingFontWeight: 600,
        wingFontColor: '#ffffff',
        wingIconSize: 35,
        buttonWidth: 60,
        buttonBackgroundColor: '#ff7f7f',
        buttonFontColor: '#ffffff',
        buttonFontWeight: 700,
        buttonFontSize: 14,
        buttonCrossImgSize: '50%',
        buttonOpacity: 0.7,
    };

    public positions = [
        { value: 'topLeft', display: 'Top Left' },
        { value: 'topRight', display: 'Top Right' },
        { value: 'bottomLeft', display: 'Bottom Left' },
        { value: 'bottomRight', display: 'Bottom Right' },
    ];

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

    private render: boolean = true;

    private options: Object = {
        font: 'Baloo Bhaina, cursive',
    };

    constructor( private cdRef: ChangeDetectorRef ) {
    }

    public ngOnInit(): void {
        /*if (window.innerWidth < 450) {
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
         }*/
    }

    public applyChanges( field: string, value: any ): any {
        if (!this.options.hasOwnProperty(field) || this.options[field] != value) {
            this.render = false;
            this.options[field] = value;
            this.cdRef.detectChanges();
            this.render = true;
        }
    }

    public applyDefault( field: string ) {
        if (this.options.hasOwnProperty(field)) {
            this.render = false;
            this.options[field] = this.defaultOptions[field];
            this.cdRef.detectChanges();
            this.render = true;
            this.cdRef.detectChanges();
            delete this.options[field];
        }
    }
}
