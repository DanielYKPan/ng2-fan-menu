import { MenuOptions } from './menu-options.service';
export declare class SpinService {
    private menuOptions;
    private lastSpinDegree;
    private spinDegrees;
    readonly SpinDegrees: number;
    private transitionStyle;
    readonly TransitionStyle: string;
    private startPositionDegrees;
    constructor(menuOptions: MenuOptions);
    setStartPosition(position: {
        x: number;
        y: number;
    }): void;
    setSpinDegrees(position: {
        x: number;
        y: number;
    }): void;
    setLastSpinDegrees(position: {
        x: number;
        y: number;
    }): void;
    private radToDeg(angle);
}
