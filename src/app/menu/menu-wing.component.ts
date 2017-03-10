/**
 * menu-wing.component
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { IMenuWing, MenuOptions } from './menu-options.service';

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
export class MenuWingComponent implements OnInit, OnChanges, OnDestroy {

    @Input() wing: IMenuWing;
    @Input() index: number;
    @Input() svgPath: string;
    @Input() menuState: boolean;
    @Input() position: string;

    private timeOutId: number = 0;
    private scaleSize: number;
    private rotateDeg: number;

    constructor( private menuOptions: MenuOptions ) {
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        this.clearTimer();
    }

    public ngOnChanges( changes: SimpleChanges ): void {

        if (changes['position'] && changes['position'].isFirstChange()) {
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 0;
        }

        if (changes['position'] && !changes['position'].isFirstChange() &&
            this.scaleSize > 0) {
            this.rotateDeg = this.menuOptions.StartAngles[this.position]
                + (this.index * this.menuOptions.MenuConfig.angle);
        }

        if (changes['menuState'] &&
            changes['menuState'].previousValue === true &&
            changes['menuState'].currentValue === false) {
            this.clearTimer();
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 1;

            this.timeOutId = window.setTimeout(() => {
                this.scaleSize = 0;
            }, 400);
        }

        if (changes['menuState'] && changes['menuState'].currentValue === true &&
            (changes['menuState'].previousValue === false || changes['menuState'].isFirstChange())) {
            this.clearTimer();
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 1;

            this.timeOutId = window.setTimeout(() => {
                this.rotateDeg = this.menuOptions.StartAngles[this.position] +
                    (this.index * this.menuOptions.MenuConfig.angle);
            }, 400);
        }
    }

    public onMouseOver(): void {
        this.scaleSize = 1.2;
    }

    public onMouseOut(): void {
        this.scaleSize = 1;
    }

    private clearTimer(): void {
        clearTimeout(this.timeOutId);
    }
}
