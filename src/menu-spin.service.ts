/**
 * menu-spin.service
 */

import { Injectable } from '@angular/core';
import { MenuOptions } from './menu-options.service';

@Injectable()
export class SpinService {

    private lastSpinDegree: number = 0;

    /* Property spinDegrees */
    private spinDegrees: number = 0;

    get SpinDegrees(): number {
        return this.spinDegrees;
    }

    /* Property transitionStyle */
    private transitionStyle: string = 'all .3s cubic-bezier(0.680, -0.550, 0.265, 1.550)';

    get TransitionStyle(): string {
        return this.transitionStyle;
    }

    /* Property startPosition */
    private startPositionDegrees: number;

    constructor( private menuOptions: MenuOptions ) {
    }

    public setStartPosition( position: {x: number, y: number} ): void {
        this.transitionStyle = 'none';
        this.startPositionDegrees = this.radToDeg(
            Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
        );
    }

    public setSpinDegrees( position: {x: number, y: number} ): void {
        let degrees = this.radToDeg(
                Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
            ) - this.startPositionDegrees;

        this.spinDegrees = this.lastSpinDegree + degrees;
    }

    public setLastSpinDegrees( position: {x: number, y: number} ): void {
        this.transitionStyle = 'all .3s cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.lastSpinDegree += this.radToDeg(
                Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
            ) - this.startPositionDegrees;
    }

    private  radToDeg( angle: number ): number {
        return angle * (180 / Math.PI);
    }
}
