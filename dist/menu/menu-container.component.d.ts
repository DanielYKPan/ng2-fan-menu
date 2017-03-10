import { OnInit } from '@angular/core';
import { MenuOptions } from './menu-options.service';
export declare class MenuContainerComponent implements OnInit {
    menuOptions: MenuOptions;
    private options;
    private gutter;
    private wings;
    private startAngles;
    private menuContainerStyle;
    private allowTransition;
    private dragStart;
    private drag;
    private startEvent;
    private svgPath;
    private menuState;
    private positionClass;
    private textRotate;
    private textAnchor;
    constructor(menuOptions: MenuOptions);
    ngOnInit(): void;
    animationDone(): void;
    toggleMenu(): void;
    onMouseDown(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    private calculateMenuContainerPosition();
    private calculateSvgPath();
}
