"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_options_service_1 = require("./menu-options.service");
var SpinService = (function () {
    function SpinService(menuOptions) {
        this.menuOptions = menuOptions;
        this.lastSpinDegree = 0;
        this.spinDegrees = 0;
        this.transitionStyle = 'all .3s cubic-bezier(0.680, -0.550, 0.265, 1.550)';
    }
    Object.defineProperty(SpinService.prototype, "SpinDegrees", {
        get: function () {
            return this.spinDegrees;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinService.prototype, "TransitionStyle", {
        get: function () {
            return this.transitionStyle;
        },
        enumerable: true,
        configurable: true
    });
    SpinService.prototype.setStartPosition = function (position) {
        this.transitionStyle = 'none';
        this.startPositionDegrees = this.radToDeg(Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x));
    };
    SpinService.prototype.setSpinDegrees = function (position) {
        var degrees = this.radToDeg(Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)) - this.startPositionDegrees;
        this.spinDegrees = this.lastSpinDegree + degrees;
    };
    SpinService.prototype.setLastSpinDegrees = function (position) {
        this.transitionStyle = 'all .3s cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        this.lastSpinDegree += this.radToDeg(Math.atan2(position.y - this.menuOptions.Center.y, position.x - this.menuOptions.Center.x)) - this.startPositionDegrees;
    };
    SpinService.prototype.radToDeg = function (angle) {
        return angle * (180 / Math.PI);
    };
    return SpinService;
}());
SpinService.decorators = [
    { type: core_1.Injectable },
];
SpinService.ctorParameters = function () { return [
    { type: menu_options_service_1.MenuOptions, },
]; };
exports.SpinService = SpinService;
//# sourceMappingURL=menu-spin.service.js.map