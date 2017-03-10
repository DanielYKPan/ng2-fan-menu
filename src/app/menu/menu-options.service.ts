/**
 * menu-options.service
 */

import { Injectable } from '@angular/core';

export interface IMenuConfig {
    buttonWidth?: number,
    defaultOpen?: boolean,
    positionClass?: 'topLeft'| 'topRight'| 'bottomLeft' | 'bottomRight',
    radius?: number,
    angle?: number,
    offset?: number,
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
        defaultOpen: true,
        positionClass: 'topLeft',
        radius: 180, // The radius of the menu wings from the center of the button.
        angle: 30, // The angle at which each wing will open
        offset: 25, // The gap between the menu button and the menu item wings.
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

    constructor() {
    }

    public setMenuOptions( menuConfig: IMenuConfig, gutter: Object ): void {
        this.menuConfig = Object.assign(this.menuConfig, menuConfig);
        this.gutter = Object.assign(this.gutter, gutter);
    }

    public toggleMenuState(): void {
        this.menuConfig.defaultOpen = !this.menuConfig.defaultOpen;
    }
}
