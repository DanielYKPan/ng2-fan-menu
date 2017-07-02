/**
 * menu-spin.service
 */

import { Injectable } from '@angular/core';
import { MenuOptions } from './menu-options.service';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class SpinService {

    private lastSpinDegree: number = 0;

    /* Property startPosition */
    private startPositionDegrees: number;

    private wingSpunSource = new Subject<number>();

    public wingSpun = this.wingSpunSource.asObservable();

    constructor( private menuOptions: MenuOptions ) {
    }

    public setStartPosition( position: {x: number, y: number} ): void {
        this.startPositionDegrees = this.radToDeg(
            Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
        );
    }

    public calculateSpinDegrees( position: {x: number, y: number} ): void {
        let degrees = this.radToDeg(
                Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
            ) - this.startPositionDegrees;

        let deg = this.lastSpinDegree + degrees;
        this.wingSpunSource.next(deg);
    }

    public setLastSpinDegrees( position: {x: number, y: number} ): void {
        this.lastSpinDegree += this.radToDeg(
                Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)
            ) - this.startPositionDegrees;
    }

    private  radToDeg( angle: number ): number {
        return angle * (180 / Math.PI);
    }
}
