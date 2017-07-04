/**
 * menu-wing.component
 */

import {
    Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter,
    ElementRef, Renderer2, HostBinding, ViewChild, AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import { IMenuWing, MenuOptions } from './menu-options.service';
import { SpinService } from './menu-spin.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-menu-wing',
    templateUrl: './menu-wing.component.html',
    styleUrls: ['./menu-wing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('rotateWing', [
            transition(':enter', [
                style({transform: 'rotate({{startAngles}}deg) scale(0)'}),
                animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({transform: 'rotate({{startAngles}}deg) scale(1)'})),
                animate('300ms 300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style('*'))
            ]),
            transition(':leave', [
                animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({transform: 'rotate({{startAngles}}deg) scale(1)'})),
                animate('300ms 300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)', style({transform: 'rotate({{startAngles}}deg) scale(0)'}))
            ]),
        ]),
        trigger('scaleWing', [
            state('0', style({transform: 'scale(1)'})),
            state('1', style({transform: 'scale(1.2)'})),
            transition('0<=>1', [
                animate('300ms cubic-bezier(0.680, -0.550, 0.265, 1.550)')
            ]),
        ]),
    ],
})
export class MenuWingComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    @ViewChild('wingIconElm') public wingIconElm: ElementRef;
    @Input() public wing: IMenuWing;
    @Input() public index: number;
    @Input() public svgPath: string;
    @Input() public position: string;
    @Output() public wingClicked = new EventEmitter<IMenuWing>();
    @Output() public wingHovered = new EventEmitter<IMenuWing>();
    @Output() public wingSpinning = new EventEmitter<boolean>();

    public startAngles: number;
    public rotateDeg: number;
    public scaleWingState: boolean = false;
    public menuConfig: any;
    public iconX: number;
    public iconY: number;
    public iconSize: number;
    public wingTextStyle: any;

    private wingSpunDegs: number = 0;
    private wingSpunSubscriptionId: Subscription;

    constructor( private menuOptions: MenuOptions,
                 private spinService: SpinService,
                 private elm: ElementRef,
                 private renderer: Renderer2 ) {
        this.menuConfig = this.menuOptions.MenuConfig;
    }

    public ngOnInit() {
        this.calculateWingIconSizeAndPosition();

        this.wingSpunSubscriptionId = this.spinService.wingSpun.subscribe(
            ( data: number ) => {
                this.wingSpunDegs = data;
                this.setWingIconTransformStyle(this.wingSpunDegs);
            }
        );
    }

    public ngOnDestroy(): void {
        this.wingSpunSubscriptionId.unsubscribe();
    }

    public ngOnChanges( changes: SimpleChanges ): void {

        // When the menu's position changes,
        // recalculate each wing's and its icon rotation degrees
        if (changes['position']) {
            this.startAngles = this.menuOptions.StartAngles[this.position];
            this.rotateWingState = {value: '', params: {startAngles: this.startAngles}};
            this.rotateDeg = this.startAngles +
                (this.index * this.menuConfig.angle);
            this.setWingTransformStyle();
            this.wingTextStyle = this.menuOptions.MenuPositions[this.position];
        }

        if (changes['position'] && !changes['position'].isFirstChange()) {
            this.setWingIconTransformStyle(this.wingSpunDegs);
        }
    }

    public ngAfterViewInit(): void {
        this.setWingIconTransformStyle(this.wingSpunDegs);
    }

    /**
     * Binding to rotateWing animation
     * */
    @HostBinding('@rotateWing')
    public rotateWingState: any = {value: '', params: {startAngles: 0}};

    /**
     * Mouse hover on the wing
     * */
    public onMouseOver(): void {
        this.scaleWingState = true;
        this.wingHovered.emit(this.wing);
    }

    /**
     * Mouse out off the wing
     * */
    public onMouseOut(): void {
        this.scaleWingState = false;
    }

    /**
     * Click on the wing
     * */
    public onClick(): void {
        this.wingClicked.emit(this.wing);
    }

    /**
     * Record the pan start position
     * */
    public onPanStart( event: any ): void {
        if (this.menuConfig.spinable) {
            this.wingSpinning.emit(true);
            this.spinService.setStartPosition(event.center);
        }
    }

    /**
     * Spin the whole menu
     * */
    public spinMenu( event: any ): void {
        if (this.menuConfig.spinable) {
            this.scaleWingState = false;
            this.spinService.calculateSpinDegrees(event.center);
        }
    }

    /**
     * Record the pan end position
     * */
    public onPanEnd( event: any ): void {
        if (this.menuConfig.spinable) {
            this.wingSpinning.emit(false);
            this.spinService.setLastSpinDegrees(event.center);
        }
    }

    /**
     * Set wing transform style
     * */
    private setWingTransformStyle(): void {
        this.renderer.setStyle(this.elm.nativeElement, 'transform', 'rotate(' + this.rotateDeg + 'deg)');
        this.renderer.setStyle(this.elm.nativeElement, '-webkit-transform', 'rotate(' + this.rotateDeg + 'deg)');
        this.renderer.setStyle(this.elm.nativeElement, '-ms-transform', 'rotate(' + this.rotateDeg + 'deg)');
        this.renderer.setStyle(this.elm.nativeElement, '-moz-transform', 'rotate(' + this.rotateDeg + 'deg)');
        this.renderer.setStyle(this.elm.nativeElement, '-o-transform', 'rotate(' + this.rotateDeg + 'deg)');
        return;
    }

    /**
     * Set wing icon transform style
     * */
    private setWingIconTransformStyle( deg: number ): void {
        if (this.menuConfig.showIcons || this.menuConfig.onlyIcons) {
            this.renderer.setStyle(this.wingIconElm.nativeElement, 'transform', 'translate(' + this.iconX + 'px, ' + this.iconY + 'px) rotate(' + (this.rotateDeg + deg) * -1 + 'deg)');
            this.renderer.setStyle(this.wingIconElm.nativeElement, '-webkit-transform', 'translate(' + this.iconX + 'px, ' + this.iconY + 'px) rotate(' + (this.rotateDeg + deg) * -1 + 'deg)');
            this.renderer.setStyle(this.wingIconElm.nativeElement, '-ms-transform', 'translate(' + this.iconX + 'px, ' + this.iconY + 'px) rotate(' + (this.rotateDeg + deg) * -1 + 'deg)');
            this.renderer.setStyle(this.wingIconElm.nativeElement, '-moz-transform', 'translate(' + this.iconX + 'px, ' + this.iconY + 'px) rotate(' + (this.rotateDeg + deg) * -1 + 'deg)');
            this.renderer.setStyle(this.wingIconElm.nativeElement, '-o-transform', 'translate(' + this.iconX + 'px, ' + this.iconY + 'px) rotate(' + (this.rotateDeg + deg) * -1 + 'deg)');
        }
        return;
    }

    /**
     * Calculate wing's icon size and position
     * */
    private calculateWingIconSizeAndPosition(): void {
        this.iconSize = this.wing.icon.size || this.menuConfig.wingIconSize;
        if (this.menuConfig.onlyIcons) {
            this.iconX = this.menuConfig.radius - this.menuConfig.radius / 2 + this.iconSize / 4;
        } else {
            this.iconX = this.menuConfig.radius - this.iconSize - 8;
        }
        this.iconY = -(this.menuConfig.radius / 2 + this.iconSize / 2 + 5);
        return;
    }
}
