export interface IMenuConfig {
    font?: string;
    defaultOpen?: boolean;
    defaultPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    radius?: number;
    angle?: number;
    offset?: number;
    showIcons?: boolean;
    onlyIcons?: boolean;
    spinable?: boolean;
    wingFontSize?: number;
    wingFontWeight?: number;
    wingFontColor?: string;
    wingIconSize?: number;
}
export interface IMenuButton {
    width?: number;
    color?: string;
    backgroundColor?: string;
    fontWeight?: number;
    fontSize?: string;
    crossImgSize?: string;
}
export interface IMenuWing {
    title: string;
    color: string;
    titleColor?: string;
    icon?: {
        name: string;
        color?: string;
        size?: number;
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
    private buttonConfig;
    readonly Button: IMenuButton;
    private center;
    Center: {
        x: number;
        y: number;
    };
    constructor();
    setMenuOptions(menuConfig: IMenuConfig, buttonConfig: IMenuButton, gutter: Object, startAngles: Object): void;
}
