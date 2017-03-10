/**
 * menu-wing.component
 */

import { Component, OnInit } from '@angular/core';

// webpack1_
declare let require: any;
const myDpStyles: string = require("./menu-wing.component.scss");
const myDpTpl: string = require("./menu-wing.component.html");
// webpack2_

@Component({
    selector: 'app-menu-wing',
    template: myDpTpl,
    styles: [myDpStyles],
})
export class MenuWingComponent implements OnInit {
    constructor() {
    }

    public ngOnInit() {
    }

}
