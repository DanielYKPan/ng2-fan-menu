/**
 * menu-container.component
 */

import { Component, OnInit } from '@angular/core';

// webpack1_
declare let require: any;
const myDpStyles: string = require("./menu-container.component.scss");
const myDpTpl: string = require("./menu-container.component.html");
// webpack2_

@Component({
    selector: 'app-menu-container',
    template: myDpTpl,
    styles: [myDpStyles],
})
export class MenuContainerComponent implements OnInit {
    constructor() {
    }

    public ngOnInit() {
    }
}
