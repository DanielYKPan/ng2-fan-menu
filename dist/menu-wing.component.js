"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_options_service_1 = require("./menu-options.service");
var menu_spin_service_1 = require("./menu-spin.service");
var MenuWingComponent = (function () {
    function MenuWingComponent(menuOptions, spinService) {
        this.menuOptions = menuOptions;
        this.spinService = spinService;
        this.wingClicked = new core_1.EventEmitter();
        this.timeOutId = 0;
    }
    MenuWingComponent.prototype.ngOnInit = function () {
        this.iconSize = this.wing.icon.size || this.menuOptions.MenuConfig.wingIconSize;
        if (this.menuOptions.MenuConfig.onlyIcons) {
            this.iconX = this.menuOptions.MenuConfig.radius - this.menuOptions.MenuConfig.radius / 2 + this.iconSize / 4;
        }
        else {
            this.iconX = this.menuOptions.MenuConfig.radius - this.iconSize - 8;
        }
        this.iconY = -(this.menuOptions.MenuConfig.radius / 2 + this.iconSize / 2 + 5);
    };
    MenuWingComponent.prototype.ngOnDestroy = function () {
        this.clearTimer();
    };
    MenuWingComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['position'] && changes['position'].isFirstChange()) {
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 0;
        }
        if (changes['position'] && !changes['position'].isFirstChange() &&
            this.scaleSize > 0) {
            this.rotateDeg = this.menuOptions.StartAngles[this.position]
                + (this.index * this.menuOptions.MenuConfig.angle);
        }
        if (changes['menuState'] &&
            changes['menuState'].previousValue === true &&
            changes['menuState'].currentValue === false) {
            this.clearTimer();
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 1;
            this.timeOutId = window.setTimeout(function () {
                _this.scaleSize = 0;
            }, 400);
        }
        if (changes['menuState'] && changes['menuState'].currentValue === true &&
            (changes['menuState'].previousValue === false || changes['menuState'].isFirstChange())) {
            this.clearTimer();
            this.rotateDeg = this.menuOptions.StartAngles[this.position];
            this.scaleSize = 1;
            this.timeOutId = window.setTimeout(function () {
                _this.rotateDeg = _this.menuOptions.StartAngles[_this.position] +
                    (_this.index * _this.menuOptions.MenuConfig.angle);
            }, 400);
        }
    };
    MenuWingComponent.prototype.onMouseOver = function () {
        if (this.menuState) {
            this.scaleSize = 1.2;
        }
    };
    MenuWingComponent.prototype.onMouseOut = function () {
        if (this.menuState) {
            this.scaleSize = 1;
        }
    };
    MenuWingComponent.prototype.onClick = function () {
        this.wingClicked.emit(this.wing);
    };
    MenuWingComponent.prototype.onPanStart = function (event) {
        if (this.menuOptions.MenuConfig.spinable) {
            this.scaleSize = 1;
            this.spinService.setStartPosition(event.center);
        }
    };
    MenuWingComponent.prototype.onRotate = function (event) {
        if (this.menuOptions.MenuConfig.spinable) {
            this.spinService.setSpinDegrees(event.center);
        }
    };
    MenuWingComponent.prototype.onPanEnd = function (event) {
        if (this.menuOptions.MenuConfig.spinable) {
            this.spinService.setLastSpinDegrees(event.center);
        }
    };
    MenuWingComponent.prototype.clearTimer = function () {
        clearTimeout(this.timeOutId);
    };
    return MenuWingComponent;
}());
MenuWingComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-menu-wing',
                template: "<div class=\"wing wing-{{index}}\" [ngStyle]=\"{\n        'transition': spinService.TransitionStyle,\n        '-webkit-transition': spinService.TransitionStyle,\n        '-moz-transition': spinService.TransitionStyle,\n        '-ms-transition': spinService.TransitionStyle,\n        'transform': 'rotate(' + (rotateDeg + spinService.SpinDegrees) + 'deg) '+ 'scale(' + scaleSize +')',\n        '-webkit-transform': 'rotate(' + (rotateDeg + spinService.SpinDegrees) + 'deg) '+ 'scale(' + scaleSize +')',\n        '-ms-transform': 'rotate(' + (rotateDeg + spinService.SpinDegrees) + 'deg) '+ 'scale(' + scaleSize +')',\n        '-moz-transform': 'rotate(' + (rotateDeg + spinService.SpinDegrees) + 'deg) '+ 'scale(' + scaleSize +')',\n        '-o-transform': 'rotate(' + (rotateDeg + spinService.SpinDegrees) + 'deg) '+ 'scale(' + scaleSize +')'\n     }\"><svg class=\"wing-svg\" width=\"100%\" height=\"100%\" (panstart)=\"onPanStart($event)\" (panmove)=\"onRotate($event)\" (panend)=\"onPanEnd($event)\"><path style=\"pointer-events:auto\" (tap)=\"onClick()\" (mouseover)=\"onMouseOver()\" (mouseout)=\"onMouseOut()\" [attr.fill]=\"wing.color\" [attr.d]=\"svgPath\"></path><text class=\"wing-text\" *ngIf=\"!menuOptions.MenuConfig.onlyIcons\" x=\"50%\" y=\"50%\" dominant-baseline=\"central\" style=\"text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)\" [ngStyle]=\"{'font-size': menuOptions.MenuConfig.wingFontSize + 'px'}\" [attr.text-anchor]=\"textAnchor\" [attr.transform]=\"'rotate('+ textRotate + ', ' + menuOptions.MenuConfig.radius/2  + ', ' + menuOptions.MenuConfig.radius/2 + ')'\" [attr.fill]=\"wing.titleColor || menuOptions.MenuConfig.wingFontColor\">{{wing.title}}</text></svg> <i class=\"{{wing.icon.name}}\" *ngIf=\"menuOptions.MenuConfig.showIcons || menuOptions.MenuConfig.onlyIcons\" [ngStyle]=\"{\n            'color': wing.icon.color || menuOptions.MenuConfig.wingFontColor,\n            'font-size': iconSize + 'px',\n            'width': iconSize + 'px',\n            'height': iconSize + 'px',\n            'transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ (rotateDeg + spinService.SpinDegrees) * -1 + 'deg)',\n            '-webkit-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ (rotateDeg + spinService.SpinDegrees) * -1 + 'deg)',\n            '-ms-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ (rotateDeg + spinService.SpinDegrees) * -1 + 'deg)',\n            '-moz-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ (rotateDeg + spinService.SpinDegrees) * -1 + 'deg)',\n            '-o-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ (rotateDeg + spinService.SpinDegrees) * -1 + 'deg)'\n       }\"></i></div>",
                styles: [".wing{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;width:100%;height:100%;position:absolute;cursor:pointer;-webkit-transform-origin:0 50%;-moz-transform-origin:0 50%;-ms-transform-origin:0 50%;transform-origin:0 50%;-webkit-transition:all .3s cubic-bezier(.68,-.55,.265,1.55);-moz-transition:all .3s cubic-bezier(.68,-.55,.265,1.55);transition:all .3s cubic-bezier(.68,-.55,.265,1.55)}.wing i{text-align:center;-webkit-transform-origin:50% 50%;-moz-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}"],
            },] },
];
MenuWingComponent.ctorParameters = function () { return [
    { type: menu_options_service_1.MenuOptions, },
    { type: menu_spin_service_1.SpinService, },
]; };
MenuWingComponent.propDecorators = {
    'wing': [{ type: core_1.Input },],
    'index': [{ type: core_1.Input },],
    'svgPath': [{ type: core_1.Input },],
    'menuState': [{ type: core_1.Input },],
    'position': [{ type: core_1.Input },],
    'textRotate': [{ type: core_1.Input },],
    'textAnchor': [{ type: core_1.Input },],
    'wingClicked': [{ type: core_1.Output },],
};
exports.MenuWingComponent = MenuWingComponent;
//# sourceMappingURL=menu-wing.component.js.map