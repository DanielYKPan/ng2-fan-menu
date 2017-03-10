import { OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { IMenuWing, MenuOptions } from './menu-options.service';
export declare class MenuWingComponent implements OnInit, OnChanges, OnDestroy {
    private menuOptions;
    wing: IMenuWing;
    index: number;
    svgPath: string;
    menuState: boolean;
    position: string;
    textRotate: number;
    textAnchor: string;
    private timeOutId;
    private scaleSize;
    private rotateDeg;
    private iconX;
    private iconY;
    private iconSize;
    constructor(menuOptions: MenuOptions);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onMouseOver(): void;
    onMouseOut(): void;
    private clearTimer();
}
