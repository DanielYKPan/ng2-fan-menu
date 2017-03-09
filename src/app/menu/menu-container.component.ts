/**
 * menu-container.component
 */

import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { MenuOptions, IMenuConfig } from './menu-options.service';

// webpack1_
declare let require: any;
const myDpStyles: string = require("./menu-container.component.scss");
const myDpTpl: string = require("./menu-container.component.html");
// webpack2_

@Component({
    selector: 'app-menu-container',
    template: myDpTpl,
    styles: [myDpStyles],
    animations: [
        trigger('menuScaleInOut', [
            state('false', style({
                opacity: 1,
                transform: 'scale(1)'
            })),
            state('true', style({
                opacity: 0,
                transform: 'scale(0)'
            })),
            transition('false <=> true', animate('300ms linear'))
        ]),
        trigger('crossScaleInOut', [
            state('true', style({
                opacity: 1,
                transform: 'scale(1)'
            })),
            state('false', style({
                opacity: 0,
                transform: 'scale(0)'
            })),
            transition('false <=> true', animate('300ms linear'))
        ])
    ],
})
export class MenuContainerComponent implements OnInit {

    @Input() private options: IMenuConfig;

    // The space between the menu and the boundaries of the page window
    @Input() private gutter: Object;

    private menuContainerStyle = {
        'width.px': this.menuOptions.MenuConfig.buttonWidth,
        'height.px': this.menuOptions.MenuConfig.buttonWidth,
        'top.px': 0,
        'left.px': 0,
        'transition': 'none',
    };

    // a flag to indicate if button text animation finished
    private allowTransition: boolean = true;

    constructor( public menuOptions: MenuOptions ) {
    }

    public ngOnInit() {
        this.menuOptions.setMenuOptions(this.options, this.gutter);
        this.calculateMenuContainerPosition();
    }

    public animationDone() {
        this.allowTransition = true;
    }

    public toggleMenu() {
        if (this.allowTransition) {
            this.menuOptions.toggleMenuState();
            this.allowTransition = false;
        }
    }

    private calculateMenuContainerPosition() {
        if (this.menuOptions.MenuConfig.positionClass === 'topLeft') {

            this.menuContainerStyle['top.px'] = this.menuOptions.Gutter.top;
            this.menuContainerStyle['left.px'] = this.menuOptions.Gutter.left;

        } else if (this.menuOptions.MenuConfig.positionClass === 'topRight') {

            this.menuContainerStyle['top.px'] = this.menuOptions.Gutter.top;
            this.menuContainerStyle['left.px'] = window.innerWidth - this.menuOptions.MenuConfig.buttonWidth -
                this.menuOptions.Gutter.right;

        } else if (this.menuOptions.MenuConfig.positionClass === 'bottomLeft') {

            this.menuContainerStyle['top.px'] = window.innerHeight - this.menuOptions.MenuConfig.buttonWidth -
                this.menuOptions.Gutter.bottom;
            this.menuContainerStyle['left.px'] = this.menuOptions.Gutter.left;

        } else if (this.menuOptions.MenuConfig.positionClass === 'bottomRight') {

            this.menuContainerStyle['top.px'] = window.innerHeight - this.menuOptions.MenuConfig.buttonWidth
                - this.menuOptions.Gutter.bottom;
            this.menuContainerStyle['left.px'] = window.innerWidth - this.menuOptions.MenuConfig.buttonWidth
                - this.menuOptions.Gutter.right;

        }
    }
}
