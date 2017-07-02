/**
 * menu-container.component
 */

import {
    Component, OnInit, Input, HostListener,
    Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { MenuOptions, IMenuConfig, IMenuWing } from './menu-options.service';
import { Subscription } from 'rxjs/Subscription';
import { SpinService } from './menu-spin.service';

@Component({
    selector: 'app-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('menu', [
            transition('0 <=> 1', [
                query(':leave', style({opacity: 1, transform: 'scale(1)'})),
                query(':enter', style({opacity: 0, transform: 'scale(0)'})),
                group([
                    query(':enter', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({
                        opacity: 1,
                        transform: 'scale(1)'
                    }))),
                    query(':leave', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({
                        opacity: 0,
                        transform: 'scale(0)'
                    })))
                ])
            ])
        ])
    ],
})
export class MenuContainerComponent implements OnInit, OnDestroy {

    @ViewChild('menuList') public menuListElm: ElementRef;

    @Input() public options: IMenuConfig;

    // The space between the menu and the boundaries of the page window
    @Input() public gutter: Object;

    @Input() public wings: IMenuWing[];

    @Input() public startAngles: Object; // the first wing starting angle

    // Emit the wing that is been selected
    @Output() public onWingSelected = new EventEmitter<IMenuWing>();

    // Emit the wing that is been mouse over
    @Output() public onWingHovered = new EventEmitter<IMenuWing>();

    // Emit true if the menu btn is clicked to open the menu,
    // false if the menu btn is clicked to close the menu.
    @Output() public onMenuBtnClicked = new EventEmitter<boolean>();

    // Emit true if the whole menu list is being spun
    @Output() public onMenuListSpinning = new EventEmitter<boolean>();

    public menuContainerStyle: Object;
    public menuBtnStyle: Object;
    public menuListStyle: Object;
    public svgPath: string;
    public menuState: boolean; // A flag to indicate if the menu is open
    public positionClass: string; // menu's position
    public textRotate: number;
    public textAnchor: string;
    public menuConfig: any;

    private allowTransition: boolean = true; // a flag to indicate if button text animation finished
    private isDragging: boolean = false; // A flag to indicate the drag move begins
    private isSpinning: boolean = false; // A flag to indicate if the menuList is spinning
    private menuSpunSubscriptionId: Subscription;

    constructor( public menuOptions: MenuOptions,
                 private spinService: SpinService,
                 private renderer: Renderer2 ) {
    }

    public ngOnInit() {
        this.menuOptions.setMenuOptions(this.options, this.gutter, this.startAngles);
        this.menuConfig = this.menuOptions.MenuConfig;
        this.menuState = this.menuConfig.defaultOpen;
        this.positionClass = this.menuConfig.defaultPosition;
        this.setElementsStyle();
        this.calculateSvgPath();
        this.calculateMenuContainerPosition();

        this.menuSpunSubscriptionId =
            this.spinService.wingSpun.subscribe(( data: number ) => this.spinMenu(data));
    }

    public ngOnDestroy(): void {
        this.menuSpunSubscriptionId.unsubscribe();
    }

    /**
     * Indicate the button text animation done
     * */
    public animationDone() {
        this.allowTransition = true;
    }

    /**
     * Emit the wing that has been clicked
     * */
    public clickWing( wing: IMenuWing ): void {
        this.onWingSelected.emit(wing);
    }

    /**
     * Emit the wing that has been mouse over
     * */
    public hoverWing( wing: IMenuWing ): void {
        if (!this.isDragging && !this.isSpinning) {
            this.onWingHovered.emit(wing);
        }
    }

    /**
     * Toggle the menu list
     * */
    public toggleMenu() {
        if (this.allowTransition) {
            this.menuState = !this.menuState;
            this.allowTransition = false;
            this.onMenuBtnClicked.emit(this.menuState);
        }
    }

    /**
     * menuBtn pan move start
     * */
    public onPanStart(): void {
        this.isDragging = true;
        this.menuContainerStyle['transition'] = 'none';
        this.menuContainerStyle['-webkit-transition'] = 'none';
        this.menuContainerStyle['-moz-transition'] = 'none';
        this.menuContainerStyle['-ms-transition'] = 'none';
    }

    /**
     * menuBtn pan move end
     * */
    public onPanEnd(): void {
        this.isDragging = false;
        this.menuContainerStyle['transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-webkit-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-moz-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.menuContainerStyle['-ms-transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';

        let centreX = window.innerWidth / 2 -
            this.menuConfig.buttonWidth / 2;
        let centreY = window.innerHeight / 2 -
            this.menuConfig.buttonWidth / 2;

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

    /**
     * Binding to document panmove
     * */
    @HostListener('document:panmove', ['$event'])
    public onMenuMove( event: any ): void {
        if (this.isDragging) {
            let y = event.center.y;
            let x = event.center.x;
            this.menuContainerStyle['top.px'] = y - this.menuConfig.buttonWidth / 2;
            this.menuContainerStyle['left.px'] = x - this.menuConfig.buttonWidth / 2;
        }
    }

    /**
     * Set menuBtn opacity when it has been mouse over
     * */
    public onMouseOverMenu(): void {
        if (this.menuBtnStyle['opacity'] < 1) {
            this.menuBtnStyle['opacity'] = 1;
        }
    }

    /**
     * Set menuBtn opacity when it has been mouse out
     * */
    public onMouseOutMenu(): void {
        if (this.menuConfig.buttonOpacity < 1 && !this.menuState) {
            this.menuBtnStyle['opacity'] = this.menuConfig.buttonOpacity;
        }
    }

    /**
     * Spin the whole menu list
     * set the menuList transform style
     * */
    public spinMenu( deg: number ): void {
        this.renderer.setStyle(this.menuListElm.nativeElement, 'transform', 'rotate(' + deg + 'deg)');
    }

    /**
     * Change the isSpinning flag
     * */
    public toggleSpinningState( state: boolean ): void {
        if(state) {
            this.onMenuListSpinning.emit(true);
        }
        this.isSpinning = state;
        return;
    }

    /**
     * Calculate menuContainer position style
     *
     * styles (top, left, textAnchor, textRotate) would
     * depend on the current positionClass value
     * */
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
            let left = window.innerWidth - this.menuConfig.buttonWidth -
                this.menuOptions.Gutter.right;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'end';
            this.textRotate = 180;
            this.menuOptions.Center = {x: left, y: top};

        } else if (this.positionClass === 'bottomLeft') {
            let top = window.innerHeight - this.menuConfig.buttonWidth -
                this.menuOptions.Gutter.bottom;
            let left = this.menuOptions.Gutter.left;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'middle';
            this.textRotate = 0;
            this.menuOptions.Center = {x: left, y: top};

        } else if (this.positionClass === 'bottomRight') {

            let top = window.innerHeight - this.menuConfig.buttonWidth
                - this.menuOptions.Gutter.bottom;
            let left = window.innerWidth - this.menuConfig.buttonWidth
                - this.menuOptions.Gutter.right;
            this.menuContainerStyle['top.px'] = top;
            this.menuContainerStyle['left.px'] = left;
            this.textAnchor = 'end';
            this.textRotate = 180;
            this.menuOptions.Center = {x: left, y: top};
        }
    }

    /**
     * Set elements styles
     * elements include menuContainer, menuBtn and menuList
     * */
    private setElementsStyle(): void {
        this.menuContainerStyle = {
            'font-family': this.menuConfig.font,
            'width.px': +this.menuConfig.buttonWidth,
            'height.px': +this.menuConfig.buttonWidth,
            'top.px': 0,
            'left.px': 0,
            'transition': 'none',
            '-webkit-transition': 'none',
            '-ms-transition': 'none',
            '-moz-transition': 'none',
        };
        this.menuBtnStyle = {
            'width.px': +this.menuConfig.buttonWidth,
            'height.px': +this.menuConfig.buttonWidth,
            'background': this.menuConfig.buttonBackgroundColor,
            'color': this.menuConfig.buttonFontColor,
            'font-size.px': this.menuConfig.buttonFontSize,
            'font-weight': this.menuConfig.buttonFontWeight,
        };
        if (!this.menuState) {
            this.menuBtnStyle['opacity'] = this.menuConfig.buttonOpacity;
        }
        this.menuListStyle = {
            'top.px': -(this.menuConfig.radius - this.menuConfig.buttonWidth) / 2,
            'left.px': +this.menuConfig.buttonWidth / 2,
            'width.px': +this.menuConfig.radius,
            'height.px': +this.menuConfig.radius,
        };

        return;
    }

    /**
     * Calculate SVG path
     * */
    private calculateSvgPath(): void {
        let buttonWidth = +this.menuConfig.buttonWidth;
        let offset = +this.menuConfig.offset;
        let angle = +this.menuConfig.angle;
        let radius = +this.menuConfig.radius;
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

        return;
    }
}
