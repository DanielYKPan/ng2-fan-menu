/**
 * menu-options.service
 */

import { Injectable } from '@angular/core';

export interface IMenuConfig {
    buttonWidth?: number,
    buttonColor?: string,
    buttonTextColor?: string,
    defaultOpen?: boolean,
    defaultPosition?: 'topLeft'| 'topRight'| 'bottomLeft' | 'bottomRight',
    radius?: number,
    angle?: number,
    offset?: number,
    showIcons?: boolean,
    onlyIcons?: boolean,
}

export interface IMenuWing {
    title: string,
    color: string,
    titleColor: string,
    icon?: {color: string, name: string, size: number}
}

@Injectable()
export class MenuOptions {

    private menuConfig: IMenuConfig = {
        buttonWidth: 60,
        buttonColor: '#ff7f7f',
        buttonTextColor: '#ffffff',
        defaultOpen: true,
        defaultPosition: 'topLeft',
        radius: 200, // The radius of the menu wings from the center of the button.
        angle: 30, // The angle at which each wing will open
        offset: 25, // The gap between the menu button and the menu item wings.
        showIcons: true, // A flag that determines whether to show icon.
        onlyIcons: false, // A flag that determines whether only show all icons and hide the wing title
    };

    get MenuConfig(): IMenuConfig {
        return this.menuConfig;
    }

    private gutter: {top?: number, left?: number, right?: number, bottom?: number} = {
        top: 130,
        left: 30,
        right: 30,
        bottom: 30,
    };

    get Gutter(): {top?: number, left?: number, right?: number, bottom?: number} {
        return this.gutter
    }

    // the first wing starting angle
    private startAngles: {topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number} = {
        topLeft: 0,
        topRight: 90,
        bottomRight: 180,
        bottomLeft: 270
    };

    get StartAngles(): {topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number} {
        return this.startAngles;
    }

    constructor() {
    }

    public setMenuOptions( menuConfig: IMenuConfig, gutter: Object, startAngles: Object ): void {
        this.menuConfig = Object.assign(this.menuConfig, menuConfig);
        this.gutter = Object.assign(this.gutter, gutter);
        this.startAngles = Object.assign(this.startAngles, startAngles);
    }

}
