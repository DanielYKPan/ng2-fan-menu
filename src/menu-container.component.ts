/**
 * menu-container.component
 */

import {
    Component, OnInit, Input, HostListener,
    Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy, ChangeDetectionStrategy, HostBinding
} from '@angular/core';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { MenuOptions, IMenuConfig, IMenuWing } from './menu-options.service';
import { Subscription } from 'rxjs/Subscription';
import { SpinService } from './menu-spin.service';

@Component({
    selector: 'app-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('btnText', [
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
        ]),
        trigger('draggingMenu', [
            transition('1 => 0', [
                style({top: '{{top}}px', left: '{{left}}px'}),
                animate('900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style('*'))
            ])
        ]),
        trigger('menuState', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('500ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({transform: 'scale(1)'})),
                query('@rotateWing', animateChild())
            ]),
            transition(':leave', [
                animate('500ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({transform: 'scale(0)'}))
            ]),
        ])
    ],
})
export class MenuContainerComponent implements OnInit, OnDestroy {

    @ViewChild('menuWings') public menuWingsElm: ElementRef;

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

    public menuBtnStyle: Object;
    public menuWingsStyle: Object;
    public svgPath: string;
    public wingsState: boolean; // A flag to indicate if the wings are open
    public positionClass: string; // menu's position
    public menuConfig: any;
    public top: number; // for draggingMenu animation
    public left: number; // for draggingMenu animation

    private allowTransition: boolean = true; // a flag to indicate if button text animation finished
    private isDragging: boolean = false; // A flag to indicate the drag move begins
    private isSpinning: boolean = false; // A flag to indicate if the menuList is spinning
    private menuSpunSubscriptionId: Subscription;

    /**
     * Binding host element to @menuState animation
     * */
    @HostBinding('@menuState')
    public menuState = true;

    /**
     * Binding host element to @draggingMenu animation
     * */
    @HostBinding('@draggingMenu')
    public draggingState = {value: false, params: {top: this.top, left: this.left}};

    constructor( private menuOptions: MenuOptions,
                 private spinService: SpinService,
                 private renderer: Renderer2,
                 private elm: ElementRef) {
    }

    public ngOnInit() {
        this.menuOptions.setMenuOptions(this.options, this.gutter, this.startAngles);
        this.menuConfig = this.menuOptions.MenuConfig;
        this.wingsState = this.menuConfig.defaultOpen;
        this.positionClass = this.menuConfig.defaultPosition;
        this.setElementsStyle();
        this.calculateSvgPath();
        this.setHostElementPosition(this.positionClass);

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
            this.wingsState = !this.wingsState;
            this.allowTransition = false;
            this.onMenuBtnClicked.emit(this.wingsState);
        }
    }

    /**
     * menuBtn pan move start
     * */
    public onPanStart(): void {
        this.isDragging = true;
        this.draggingState = {value: true, params: {top: this.top, left: this.left}};
    }

    /**
     * menuBtn pan move end
     * */
    public onPanEnd(): void {

        // For animation purpose
        this.draggingState = {value: false, params: {top: this.top, left: this.left}};

        let centreX = window.innerWidth / 2 -
            this.menuConfig.buttonWidth / 2;
        let centreY = window.innerHeight / 2 -
            this.menuConfig.buttonWidth / 2;

        // set host element's position class based on its position when the panMove ends
        if (this.top > centreY && this.left < centreX) {
            this.positionClass = 'bottomLeft';
        } else if (this.top < centreY && this.left < centreX) {
            this.positionClass = 'topLeft';
        } else if (this.top < centreY && this.left > centreX) {
            this.positionClass = 'topRight';
        } else if (this.top > centreY && this.left > centreX) {
            this.positionClass = 'bottomRight';
        }

        // reset host's position
        this.setHostElementPosition(this.positionClass);

        // reset the panMove flag and start the @draggingMenu animation
        this.isDragging = false;
    }

    /**
     * Binding to document panmove
     * */
    @HostListener('document:panmove', ['$event'])
    public onMenuMove( event: any ): void {
        if (this.isDragging) {
            let y = event.center.y;
            let x = event.center.x;
            this.top = y - this.menuConfig.buttonWidth / 2;
            this.left = x - this.menuConfig.buttonWidth / 2;
            this.renderer.setStyle(this.elm.nativeElement, 'top', this.top + 'px');
            this.renderer.setStyle(this.elm.nativeElement, 'left', this.left + 'px');
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
        if (this.menuConfig.buttonOpacity < 1 && !this.wingsState) {
            this.menuBtnStyle['opacity'] = this.menuConfig.buttonOpacity;
        }
    }

    /**
     * Spin the whole menu list
     * set the menuList transform style
     * */
    public spinMenu( deg: number ): void {
        this.renderer.setStyle(this.menuWingsElm.nativeElement, 'transform', 'rotate(' + deg + 'deg)');
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
     * Set elements styles
     * elements include the host element itself, menuBtn and menuWings
     * */
    private setElementsStyle(): void {

        // Setting host element style
        this.renderer.setStyle(this.elm.nativeElement, 'width', this.menuConfig.buttonWidth + 'px');
        this.renderer.setStyle(this.elm.nativeElement, 'height', this.menuConfig.buttonWidth + 'px');
        this.renderer.setStyle(this.elm.nativeElement, 'font-family', this.menuConfig.font);

        // Setting menuBtn style
        this.menuBtnStyle = {
            'background': this.menuConfig.buttonBackgroundColor,
            'color': this.menuConfig.buttonFontColor,
            'font-size.px': this.menuConfig.buttonFontSize,
            'font-weight': this.menuConfig.buttonFontWeight,
        };
        if (!this.wingsState) {
            this.menuBtnStyle['opacity'] = this.menuConfig.buttonOpacity;
        }

        // Setting menuWings style
        this.menuWingsStyle = {
            'top.px': -(this.menuConfig.radius - this.menuConfig.buttonWidth) / 2,
            'left.px': +this.menuConfig.buttonWidth / 2,
            'width.px': +this.menuConfig.radius,
            'height.px': +this.menuConfig.radius,
        };

        return;
    }

    /**
     * Set host element's top and left position
     * @param positionName {string}
     * @returns {void}
     * */
    private setHostElementPosition(positionName: string): void {
        this.top = this.menuOptions.MenuPositions[positionName].top;
        this.left = this.menuOptions.MenuPositions[positionName].left;
        this.renderer.setStyle(this.elm.nativeElement, 'top', this.top + 'px');
        this.renderer.setStyle(this.elm.nativeElement, 'left', this.left + 'px');

        // For menu spin purpose
        this.menuOptions.Center = {x: this.left, y: this.top};
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
