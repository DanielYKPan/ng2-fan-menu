/**
 * menu-options.service
 */

import { Injectable } from '@angular/core';

export interface IMenuConfig {
    buttonWidth?: number,
    defaultOpen?: boolean,
    positionClass?: 'topLeft'| 'topRight'| 'bottomLeft' | 'bottomRight',
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
        positionClass: 'topLeft'
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
