"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var menu_options_service_1 = require("./menu-options.service");
var MenuWingComponent = (function () {
    function MenuWingComponent(menuOptions) {
        this.menuOptions = menuOptions;
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
        this.scaleSize = 1.2;
    };
    MenuWingComponent.prototype.onMouseOut = function () {
        this.scaleSize = 1;
    };
    MenuWingComponent.prototype.clearTimer = function () {
        clearTimeout(this.timeOutId);
    };
    return MenuWingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuWingComponent.prototype, "wing", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MenuWingComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MenuWingComponent.prototype, "svgPath", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MenuWingComponent.prototype, "menuState", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MenuWingComponent.prototype, "position", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MenuWingComponent.prototype, "textRotate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MenuWingComponent.prototype, "textAnchor", void 0);
MenuWingComponent = __decorate([
    core_1.Component({
        selector: 'app-menu-wing',
        template: "<div class=\"wing wing-{{index}}\" [ngStyle]=\"{\n        'transform': 'rotate(' + rotateDeg + 'deg) '+ 'scale(' + scaleSize +')',\n        '-webkit-transform': 'rotate(' + rotateDeg + 'deg) '+ 'scale(' + scaleSize +')',\n        '-ms-transform': 'rotate(' + rotateDeg + 'deg) '+ 'scale(' + scaleSize +')',\n        '-moz-transform': 'rotate(' + rotateDeg + 'deg) '+ 'scale(' + scaleSize +')',\n        '-o-transform': 'rotate(' + rotateDeg + 'deg) '+ 'scale(' + scaleSize +')'\n     }\"><svg class=\"wing-svg\" width=\"100%\" height=\"100%\"><path style=\"pointer-events:auto\" (mouseover)=\"onMouseOver()\" (mouseout)=\"onMouseOut()\" [attr.fill]=\"wing.color\" [attr.d]=\"svgPath\"></path><text class=\"wing-text\" *ngIf=\"!menuOptions.MenuConfig.onlyIcons\" x=\"50%\" y=\"50%\" dominant-baseline=\"central\" style=\"text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2)\" [ngStyle]=\"{'font-size': menuOptions.MenuConfig.wingFontSize + 'px'}\" [attr.text-anchor]=\"textAnchor\" [attr.transform]=\"'rotate('+ textRotate + ', ' + menuOptions.MenuConfig.radius/2  + ', ' + menuOptions.MenuConfig.radius/2 + ')'\" [attr.fill]=\"wing.titleColor || menuOptions.MenuConfig.wingFontColor\">{{wing.title}}</text></svg> <i class=\"{{wing.icon.name}}\" *ngIf=\"menuOptions.MenuConfig.showIcons || menuOptions.MenuConfig.onlyIcons\" [ngStyle]=\"{\n            'color': wing.icon.color || menuOptions.MenuConfig.wingFontColor,\n            'font-size': iconSize + 'px',\n            'width': iconSize + 'px',\n            'height': iconSize + 'px',\n            'transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ rotateDeg * -1 + 'deg)',\n            '-webkit-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ rotateDeg * -1 + 'deg)',\n            '-ms-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ rotateDeg * -1 + 'deg)',\n            '-moz-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ rotateDeg * -1 + 'deg)',\n            '-o-transform': 'translate(' + iconX + 'px, ' + iconY + 'px) rotate('+ rotateDeg * -1 + 'deg)'\n       }\"></i></div>",
        styles: [".wing{pointer-events:none;width:100%;height:100%;position:absolute;cursor:pointer;-webkit-transform-origin:0 50%;-moz-transform-origin:0 50%;-ms-transform-origin:0 50%;transform-origin:0 50%;-webkit-transition:all .3s cubic-bezier(.68,-.55,.265,1.55);-moz-transition:all .3s cubic-bezier(.68,-.55,.265,1.55);transition:all .3s cubic-bezier(.68,-.55,.265,1.55)}.wing i{text-align:center;-webkit-transform-origin:50% 50%;-moz-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}"],
    }),
    __metadata("design:paramtypes", [menu_options_service_1.MenuOptions])
], MenuWingComponent);
exports.MenuWingComponent = MenuWingComponent;

//# sourceMappingURL=menu-wing.component.js.map
