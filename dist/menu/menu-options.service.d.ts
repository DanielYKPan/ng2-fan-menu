export interface IMenuConfig {
    buttonWidth?: number;
    buttonColor?: string;
    buttonTextColor?: string;
    defaultOpen?: boolean;
    defaultPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    radius?: number;
    angle?: number;
    offset?: number;
    showIcons?: boolean;
    onlyIcons?: boolean;
}
export interface IMenuWing {
    title: string;
    color: string;
    titleColor: string;
    icon?: {
        color: string;
        name: string;
        size: number;
    };
}
export declare class MenuOptions {
    private menuConfig;
    readonly MenuConfig: IMenuConfig;
    private gutter;
    readonly Gutter: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    private startAngles;
    readonly StartAngles: {
        topLeft?: number;
        topRight?: number;
        bottomRight?: number;
        bottomLeft?: number;
    };
    constructor();
    setMenuOptions(menuConfig: IMenuConfig, gutter: Object, startAngles: Object): void;
}
