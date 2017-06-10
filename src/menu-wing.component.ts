/**
 * menu-wing.component
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IMenuWing, MenuOptions } from './menu-options.service';
import { SpinService } from './menu-spin.service';

@Component({
    selector: 'app-menu-wing',
    templateUrl: './menu-wing.component.html',
    styleUrls: ['./menu-wing.component.scss'],
})
export class MenuWingComponent implements OnInit, OnChanges, OnDestroy {

    @Input() wing: IMenuWing;
    @Input() index: number;
    @Input() svgPath: string;
    @Input() menuState: boolean;
    @Input() position: string;
    @Input() textRotate: number;
    @Input() textAnchor: string;
    @Output() wingClicked = new EventEmitter<IMenuWing>();

    private timeOutId: number = 0;
    private scaleSize: number;
    private rotateDeg: number;
    private iconX: number;
    private iconY: number;
    private iconSize: number;

    constructor( private menuOptions: MenuOptions,
                 private spinService: SpinService ) {
    }

    public ngOnInit() {
        this.iconSize = this.wing.icon.size || this.menuOptions.MenuConfig.wingIconSize;
        if (this.menuOptions.MenuConfig.onlyIcons) {
            this.iconX = this.menuOptions.MenuConfig.radius - this.menuOptions.MenuConfig.radius / 2 + this.iconSize / 4;
        } else {
            this.iconX = this.menuOptions.MenuConfig.radius - this.iconSize - 8;
        }
        this.iconY = -(this.menuOptions.MenuConfig.radius / 2 + this.iconSize / 2 + 5);
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
        if (this.menuState) {
            this.scaleSize = 1.2;
        }
    }

    public onMouseOut(): void {
        if (this.menuState) {
            this.scaleSize = 1;
        }
    }

    public onClick(): void {
        this.wingClicked.emit(this.wing);
    }

    public onPanStart( event: any ): void {
        if (this.menuOptions.MenuConfig.spinable) {
            this.scaleSize = 1;
            this.spinService.setStartPosition(event.center);
        }
    }

    public onRotate( event: any ): void {
        if (this.menuOptions.MenuConfig.spinable) {
            this.spinService.setSpinDegrees(event.center);
        }
    }

    public onPanEnd( event: any ): void {
        if (this.menuOptions.MenuConfig.spinable) {
            this.spinService.setLastSpinDegrees(event.center);
        }
    }

    private clearTimer(): void {
        clearTimeout(this.timeOutId);
    }
}
