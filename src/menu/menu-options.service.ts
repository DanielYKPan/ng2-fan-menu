/**
 * menu-options.service
 */

import { Injectable } from '@angular/core';

export interface IMenuConfig {
    font?: string,
    defaultOpen?: boolean,
    defaultPosition?: 'topLeft'| 'topRight'| 'bottomLeft' | 'bottomRight',
    radius?: number,
    angle?: number,
    offset?: number,
    showIcons?: boolean,
    onlyIcons?: boolean,
}

export interface IMenuButton {
    width?: number,
    color?: string,
    backgroundColor?: string,
    fontWeight?: number,
    fontSize?: string,
    crossImgSize?: string,
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
        font: 'sans-serif',
        defaultOpen: true, // Open menu automatically on load.
        defaultPosition: 'topLeft', // The menu default position
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

    /* Property buttonConfig */
    private buttonConfig: IMenuButton = {
        width: 60,
        color: '#ffffff',
        backgroundColor: '#ff7f7f',
        fontWeight: 700,
        fontSize: '14px',
        crossImgSize: '50%'
    };

    get Button(): IMenuButton {
        return this.buttonConfig;
    }

    constructor() {
    }

    public setMenuOptions( menuConfig: IMenuConfig, buttonConfig: IMenuButton, gutter: Object, startAngles: Object ): void {
        this.menuConfig = Object.assign(this.menuConfig, menuConfig);
        this.buttonConfig = Object.assign(this.buttonConfig, buttonConfig);
        this.gutter = Object.assign(this.gutter, gutter);
        this.startAngles = Object.assign(this.startAngles, startAngles);
    }

}
