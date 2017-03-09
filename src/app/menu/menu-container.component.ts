/**
 * menu-container.component
 */

import { Component, OnInit, Input, trigger, state, style, transition, animate, HostListener } from '@angular/core';
import { MenuOptions, IMenuConfig, IMenuWing } from './menu-options.service';

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

    @Input() private wings: IMenuWing[];

    private menuContainerStyle = {
        'width.px': this.menuOptions.MenuConfig.buttonWidth,
        'height.px': this.menuOptions.MenuConfig.buttonWidth,
        'top.px': 0,
        'left.px': 0,
        'transition': 'none',
    };

    private allowTransition: boolean = true; // a flag to indicate if button text animation finished
    private dragStart: boolean = false; // A flag to indicate the drag move begins
    private drag: boolean = false; // A flag to indicate if it is a drag move
    private startEvent: MouseEvent;

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
        if (this.drag) {

            let centreX = window.innerWidth / 2 -
                this.menuOptions.MenuConfig.buttonWidth / 2;
            let centreY = window.innerHeight / 2 -
                this.menuOptions.MenuConfig.buttonWidth / 2;

            if (this.menuContainerStyle['top.px'] > centreY &&
                this.menuContainerStyle['left.px'] < centreX) {
                this.menuOptions.MenuConfig.positionClass = 'bottomLeft';
            } else if (this.menuContainerStyle['top.px'] < centreY &&
                this.menuContainerStyle['left.px'] < centreX) {
                this.menuOptions.MenuConfig.positionClass = 'topLeft';
            } else if (this.menuContainerStyle['top.px'] < centreY &&
                this.menuContainerStyle['left.px'] > centreX) {
                this.menuOptions.MenuConfig.positionClass = 'topRight';
            } else if (this.menuContainerStyle['top.px'] > centreY &&
                this.menuContainerStyle['left.px'] > centreX) {
                this.menuOptions.MenuConfig.positionClass = 'bottomRight';
            }
            this.calculateMenuContainerPosition();
            this.drag = false;
        } else if (!this.drag && this.allowTransition) {
            this.menuOptions.toggleMenuState();
            this.allowTransition = false;
        }
    }

    public onMouseDown( event: MouseEvent ): void {
        this.dragStart = true;
        this.startEvent = event;
        this.menuContainerStyle['transition'] = 'none';
    }

    public onMouseUp( event: MouseEvent ): void {
        this.dragStart = false;
        this.menuContainerStyle['transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove( event: MouseEvent ): void {
        if (this.dragStart) {
            this.drag = true;
            let y = event.clientY - this.startEvent.offsetY;
            let x = event.clientX - this.startEvent.offsetX;
            this.menuContainerStyle['top.px'] = y;
            this.menuContainerStyle['left.px'] = x;
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
