/**
 * menu-container.component
 */

import {
    Component, OnInit, Input, HostListener,
    Output, EventEmitter
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MenuOptions, IMenuConfig, IMenuWing } from './menu-options.service';

@Component({
    selector: 'app-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss'],
    animations: [
        trigger('menuScaleInOut', [
            state('0', style({
                opacity: 1,
                transform: 'scale(1)'
            })),
            state('1', style({
                opacity: 0,
                transform: 'scale(0)'
            })),
            transition('0 <=> 1', animate('300ms linear'))
        ]),
        trigger('crossScaleInOut', [
            state('0', style({
                opacity: 0,
                transform: 'scale(0)'
            })),
            state('1', style({
                opacity: 1,
                transform: 'scale(1)'
            })),
            transition('0 <=> 1', animate('300ms linear'))
        ])
    ],
})
export class MenuContainerComponent implements OnInit {

    @Input() private options: IMenuConfig;

    // The space between the menu and the boundaries of the page window
    @Input() private gutter: Object;

    @Input() private wings: IMenuWing[];

    @Input() private startAngles: Object; // the first wing starting angle

    @Output() private onWingSelected = new EventEmitter<IMenuWing>();

    private menuContainerStyle: Object;
    private menuBtnStyle: Object;
    private menuListStyle: Object;
    private allowTransition: boolean = true; // a flag to indicate if button text animation finished
    private dragStart: boolean = false; // A flag to indicate the drag move begins
    private svgPath: string;
    private menuState: boolean; // A flag to indicate if the menu is open
    private positionClass: string; // menu's position
    private textRotate: number;
    private textAnchor: string;

    constructor( public menuOptions: MenuOptions ) {
    }

    public ngOnInit() {
        this.menuOptions.setMenuOptions(this.options, this.gutter, this.startAngles);
        this.menuState = this.menuOptions.MenuConfig.defaultOpen;
        this.positionClass = this.menuOptions.MenuConfig.defaultPosition;
        this.setElementsStyle();
        this.calculateSvgPath();
        this.calculateMenuContainerPosition();
    }

    public animationDone() {
        this.allowTransition = true;
    }

    public clickWing( wing: IMenuWing ): void {
        this.onWingSelected.emit(wing);
    }

    public toggleMenu() {
        if (this.allowTransition) {
            this.menuState = !this.menuState;
            this.allowTransition = false;
        }
    }

    public onPanStart(): void {
        this.dragStart = true;
        this.menuContainerStyle['transition'] = 'none';
        this.menuContainerStyle['-webkit-transition'] = 'none';
        this.menuContainerStyle['-moz-transition'] = 'none';
        this.menuContainerStyle['-ms-transition'] = 'none';
    }

    public onPanEnd(): void {
        this.dragStart = false;
        this.menuContainerStyle['transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-webkit-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-moz-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-ms-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';

        let centreX = window.innerWidth / 2 -
            this.menuOptions.MenuConfig.buttonWidth / 2;
        let centreY = window.innerHeight / 2 -
            this.menuOptions.MenuConfig.buttonWidth / 2;

        if (this.menuContainerStyle['top.px'] > centreY &&
            this.menuContainerStyle['left.px'] < centreX) {
            this.positionClass = 'bottomLeft';
            this.textRotate = 0;
            this.textAnchor = 'middle';
        } else if (this.menuContainerStyle['top.px'] < centreY &&
            this.menuContainerStyle['left.px'] < centreX) {
            this.positionClass = 'topLeft';
            this.textRotate = 0;
            this.textAnchor = 'middle';
        } else if (this.menuContainerStyle['top.px'] < centreY &&
            this.menuContainerStyle['left.px'] > centreX) {
            this.positionClass = 'topRight';
            this.textRotate = 180;
            this.textAnchor = 'end';
        } else if (this.menuContainerStyle['top.px'] > centreY &&
            this.menuContainerStyle['left.px'] > centreX) {
            this.positionClass = 'bottomRight';
            this.textRotate = 180;
            this.textAnchor = 'end';
        }
        this.calculateMenuContainerPosition();
    }

    @HostListener('document:panmove', ['$event'])
    public onMenuMove( event: any ): void {
        if (this.dragStart) {
            let y = event.center.y;
            let x = event.center.x;
            this.menuContainerStyle['top.px'] = y - this.menuOptions.MenuConfig.buttonWidth / 2;
            this.menuContainerStyle['left.px'] = x - this.menuOptions.MenuConfig.buttonWidth / 2;
        }
    }

    public onMouseOverMenu(): void {
        if (this.menuBtnStyle['opacity'] < 1) {
            this.menuBtnStyle['opacity'] = 1;
        }
    }

    public onMouseOutMenu(): void {
        if (this.menuOptions.MenuConfig.buttonOpacity < 1 && !this.menuState) {
            this.menuBtnStyle['opacity'] = this.menuOptions.MenuConfig.buttonOpacity;
        }
    }

    private calculateMenuContainerPosition() {
        if (this.positionClass === 'topLeft') {
            let top = this.menuOptions.Gutter.top;
            let left = this.menuOptions.Gutter.left;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'middle';
            this.textRotate = 0;
            this.menuOptions.Center = {x: left, y: top};

        } else if (this.positionClass === 'topRight') {
            let top = this.menuOptions.Gutter.top;
            let left = window.innerWidth - this.menuOptions.MenuConfig.buttonWidth -
                this.menuOptions.Gutter.right;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'end';
            this.textRotate = 180;
            this.menuOptions.Center = {x: left, y: top};

        } else if (this.positionClass === 'bottomLeft') {
            let top = window.innerHeight - this.menuOptions.MenuConfig.buttonWidth -
                this.menuOptions.Gutter.bottom;
            let left = this.menuOptions.Gutter.left;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'middle';
            this.textRotate = 0;
            this.menuOptions.Center = {x: left, y: top};

        } else if (this.positionClass === 'bottomRight') {

            let top = window.innerHeight - this.menuOptions.MenuConfig.buttonWidth
                - this.menuOptions.Gutter.bottom;
            let left = window.innerWidth - this.menuOptions.MenuConfig.buttonWidth
                - this.menuOptions.Gutter.right;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'end';
            this.textRotate = 180;
            this.menuOptions.Center = {x: left, y: top};
        }
    }

    private setElementsStyle(): void {
        this.menuContainerStyle = {
            'font-family': this.menuOptions.MenuConfig.font,
            'width.px': +this.menuOptions.MenuConfig.buttonWidth,
            'height.px': +this.menuOptions.MenuConfig.buttonWidth,
            'top.px': 0,
            'left.px': 0,
            'transition': 'none',
            '-webkit-transition': 'none',
            '-ms-transition': 'none',
            '-moz-transition': 'none',
        };
        this.menuBtnStyle = {
            'width.px': +this.menuOptions.MenuConfig.buttonWidth,
            'height.px': +this.menuOptions.MenuConfig.buttonWidth,
            'background': this.menuOptions.MenuConfig.buttonBackgroundColor,
            'color': this.menuOptions.MenuConfig.buttonFontColor,
            'font-size.px': this.menuOptions.MenuConfig.buttonFontSize,
            'font-weight': this.menuOptions.MenuConfig.buttonFontWeight,
        };
        if(!this.menuState) {
            this.menuBtnStyle['opacity']= this.menuOptions.MenuConfig.buttonOpacity;
        }
        this.menuListStyle = {
            'top.px': -(this.menuOptions.MenuConfig.radius - this.menuOptions.MenuConfig.buttonWidth) / 2,
            'left.px': +this.menuOptions.MenuConfig.buttonWidth / 2,
            'width.px': +this.menuOptions.MenuConfig.radius,
            'height.px': +this.menuOptions.MenuConfig.radius,
        };
    }

    private calculateSvgPath() {
        let buttonWidth = +this.menuOptions.MenuConfig.buttonWidth;
        let offset = +this.menuOptions.MenuConfig.offset;
        let angle = +this.menuOptions.MenuConfig.angle;
        let radius = +this.menuOptions.MenuConfig.radius;
        let innerRadius = buttonWidth / 2 + offset;
        let x1 = Math.floor(radius * Math.cos(Math.PI * (360 - angle / 2) / 180));
        let y1 = Math.floor(radius / 2 + radius * Math.sin(Math.PI * (360 - angle / 2) / 180));
        let x2 = Math.floor(radius * Math.cos(Math.PI * (angle / 2) / 180));
        let y2 = Math.floor(radius / 2 + radius * Math.sin(Math.PI * (angle / 2) / 180));
        let a1 = Math.floor(innerRadius * Math.cos(Math.PI * (360 - angle / 2) / 180));
        let b1 = Math.floor(radius / 2 + innerRadius * Math.sin(Math.PI * (360 - angle / 2) / 180));
        let a2 = Math.floor(innerRadius * Math.cos(Math.PI * (angle / 2) / 180));
        let b2 = Math.floor(radius / 2 + 1 + innerRadius * Math.sin(Math.PI * (angle / 2) / 180));

        this.svgPath = 'M' + a1 + ',' + b1 + ' L' + x1 + ',' + y1 + ' A' +
            radius + ',' + radius + ' 0 0, 1' + ' ' + x2 + ',' + y2 +
            ' L' + a2 + ',' + b2 + '  A' + innerRadius + ',' + innerRadius +
            ' 1 0, 0' + ' ' + a1 + ',' + b1 + ' z';
    }
}
