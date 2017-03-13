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
var MenuOptions = (function () {
    function MenuOptions() {
        this.menuConfig = {
            font: 'sans-serif',
            defaultOpen: true,
            defaultPosition: 'topLeft',
            radius: 200,
            angle: 30,
            offset: 25,
            showIcons: true,
            onlyIcons: false,
            spinable: false,
            wingFontSize: 16,
            wingFontWeight: 600,
            wingFontColor: '#ffffff',
            wingIconSize: 35,
            buttonWidth: 60,
            buttonBackgroundColor: '#ff7f7f',
            buttonFontColor: '#ffffff',
            buttonFontWeight: 700,
            buttonFontSize: '14px',
            buttonCrossImgSize: '50%',
            buttonOpacity: 0.7,
        };
        this.gutter = {
            top: 130,
            left: 30,
            right: 30,
            bottom: 30,
        };
        this.startAngles = {
            topLeft: 0,
            topRight: 90,
            bottomRight: 180,
            bottomLeft: 270
        };
    }
    Object.defineProperty(MenuOptions.prototype, "MenuConfig", {
        get: function () {
            return this.menuConfig;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuOptions.prototype, "Gutter", {
        get: function () {
            return this.gutter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuOptions.prototype, "StartAngles", {
        get: function () {
            return this.startAngles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuOptions.prototype, "Center", {
        get: function () {
            return this.center;
        },
        set: function (value) {
            this.center = {
                x: value.x + this.menuConfig.buttonWidth / 2,
                y: value.y + this.menuConfig.buttonWidth / 2
            };
        },
        enumerable: true,
        configurable: true
    });
    MenuOptions.prototype.setMenuOptions = function (menuConfig, gutter, startAngles) {
        this.menuConfig = Object.assign(this.menuConfig, menuConfig);
        this.gutter = Object.assign(this.gutter, gutter);
        this.startAngles = Object.assign(this.startAngles, startAngles);
    };
    return MenuOptions;
}());
MenuOptions = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MenuOptions);
exports.MenuOptions = MenuOptions;

//# sourceMappingURL=menu-options.service.js.map
