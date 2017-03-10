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
var MenuContainerComponent = (function () {
    function MenuContainerComponent(menuOptions) {
        this.menuOptions = menuOptions;
        this.allowTransition = true;
        this.dragStart = false;
        this.textRotate = 0;
        this.textAnchor = 'start';
    }
    MenuContainerComponent.prototype.ngOnInit = function () {
        this.menuOptions.setMenuOptions(this.options, this.button, this.gutter, this.startAngles);
        this.menuState = this.menuOptions.MenuConfig.defaultOpen;
        this.positionClass = this.menuOptions.MenuConfig.defaultPosition;
        this.setElementsStyle();
        this.calculateSvgPath();
        this.calculateMenuContainerPosition();
    };
    MenuContainerComponent.prototype.animationDone = function () {
        this.allowTransition = true;
    };
    MenuContainerComponent.prototype.toggleMenu = function () {
        if (this.allowTransition) {
            this.menuState = !this.menuState;
            this.allowTransition = false;
        }
    };
    MenuContainerComponent.prototype.onPanStart = function () {
        this.dragStart = true;
        this.menuContainerStyle['transition'] = 'none';
    };
    MenuContainerComponent.prototype.onPanEnd = function () {
        this.dragStart = false;
        this.menuContainerStyle['transition'] = 'all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)';
        var centreX = window.innerWidth / 2 -
            this.menuOptions.Button.width / 2;
        var centreY = window.innerHeight / 2 -
            this.menuOptions.Button.width / 2;
        if (this.menuContainerStyle['top.px'] > centreY &&
            this.menuContainerStyle['left.px'] < centreX) {
            this.positionClass = 'bottomLeft';
            this.textRotate = 0;
            this.textAnchor = 'start';
        }
        else if (this.menuContainerStyle['top.px'] < centreY &&
            this.menuContainerStyle['left.px'] < centreX) {
            this.positionClass = 'topLeft';
            this.textRotate = 0;
            this.textAnchor = 'start';
        }
        else if (this.menuContainerStyle['top.px'] < centreY &&
            this.menuContainerStyle['left.px'] > centreX) {
            this.positionClass = 'topRight';
            this.textRotate = 180;
            this.textAnchor = 'end';
        }
        else if (this.menuContainerStyle['top.px'] > centreY &&
            this.menuContainerStyle['left.px'] > centreX) {
            this.positionClass = 'bottomRight';
            this.textRotate = 180;
            this.textAnchor = 'end';
        }
        this.calculateMenuContainerPosition();
    };
    MenuContainerComponent.prototype.onMenuMove = function (event) {
        if (this.dragStart) {
            var y = event.center.y;
            var x = event.center.x;
            this.menuContainerStyle['top.px'] = y - this.menuOptions.Button.width / 2;
            this.menuContainerStyle['left.px'] = x - this.menuOptions.Button.width / 2;
        }
    };
    MenuContainerComponent.prototype.calculateMenuContainerPosition = function () {
        if (this.positionClass === 'topLeft') {
            this.menuContainerStyle['top.px'] = this.menuOptions.Gutter.top;
            this.menuContainerStyle['left.px'] = this.menuOptions.Gutter.left;
        }
        else if (this.positionClass === 'topRight') {
            this.menuContainerStyle['top.px'] = this.menuOptions.Gutter.top;
            this.menuContainerStyle['left.px'] = window.innerWidth - this.menuOptions.Button.width -
                this.menuOptions.Gutter.right;
        }
        else if (this.positionClass === 'bottomLeft') {
            this.menuContainerStyle['top.px'] = window.innerHeight - this.menuOptions.Button.width -
                this.menuOptions.Gutter.bottom;
            this.menuContainerStyle['left.px'] = this.menuOptions.Gutter.left;
        }
        else if (this.positionClass === 'bottomRight') {
            this.menuContainerStyle['top.px'] = window.innerHeight - this.menuOptions.Button.width
                - this.menuOptions.Gutter.bottom;
            this.menuContainerStyle['left.px'] = window.innerWidth - this.menuOptions.Button.width
                - this.menuOptions.Gutter.right;
        }
    };
    MenuContainerComponent.prototype.setElementsStyle = function () {
        this.menuContainerStyle = {
            'font-family': this.menuOptions.MenuConfig.font,
            'width.px': this.menuOptions.Button.width,
            'height.px': this.menuOptions.Button.width,
            'top.px': 0,
            'left.px': 0,
            'transition': 'none',
        };
        this.menuBtnStyle = {
            'width.px': this.menuOptions.Button.width,
            'height.px': this.menuOptions.Button.width,
            'background': this.menuOptions.Button.backgroundColor,
            'color': this.menuOptions.Button.color,
            'font-size': this.menuOptions.Button.fontSize,
            'font-weight': this.menuOptions.Button.fontWeight,
        };
        this.menuListStyle = {
            'top.px': -(this.menuOptions.MenuConfig.radius - this.menuOptions.Button.width) / 2,
            'left.px': this.menuOptions.Button.width / 2,
            'width.px': this.menuOptions.MenuConfig.radius,
            'height.px': this.menuOptions.MenuConfig.radius,
        };
    };
    MenuContainerComponent.prototype.calculateSvgPath = function () {
        var buttonWidth = this.menuOptions.Button.width;
        var offset = this.menuOptions.MenuConfig.offset;
        var angle = this.menuOptions.MenuConfig.angle;
        var radius = this.menuOptions.MenuConfig.radius;
        var innerRadius = buttonWidth / 2 + offset;
        var x1 = Math.floor(radius * Math.cos(Math.PI * (360 - angle / 2) / 180));
        var y1 = Math.floor(radius / 2 + radius * Math.sin(Math.PI * (360 - angle / 2) / 180));
        var x2 = Math.floor(radius * Math.cos(Math.PI * (angle / 2) / 180));
        var y2 = Math.floor(radius / 2 + radius * Math.sin(Math.PI * (angle / 2) / 180));
        var a1 = Math.floor(innerRadius * Math.cos(Math.PI * (360 - angle / 2) / 180));
        var b1 = Math.floor(radius / 2 + innerRadius * Math.sin(Math.PI * (360 - angle / 2) / 180));
        var a2 = Math.floor(innerRadius * Math.cos(Math.PI * (angle / 2) / 180));
        var b2 = Math.floor(radius / 2 + 1 + innerRadius * Math.sin(Math.PI * (angle / 2) / 180));
        this.svgPath = 'M' + a1 + ',' + b1 + ' L' + x1 + ',' + y1 + ' A' +
            radius + ',' + radius + ' 0 0, 1' + ' ' + x2 + ',' + y2 +
            ' L' + a2 + ',' + b2 + '  A' + innerRadius + ',' + innerRadius +
            ' 1 0, 0' + ' ' + a1 + ',' + b1 + ' z';
    };
    return MenuContainerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuContainerComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuContainerComponent.prototype, "button", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuContainerComponent.prototype, "gutter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MenuContainerComponent.prototype, "wings", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenuContainerComponent.prototype, "startAngles", void 0);
__decorate([
    core_1.HostListener('document:panmove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuContainerComponent.prototype, "onMenuMove", null);
MenuContainerComponent = __decorate([
    core_1.Component({
        selector: 'app-menu-container',
        template: "<div class=\"menu-container\" [ngStyle]=\"menuContainerStyle\"><button class=\"menu-btn\" [ngStyle]=\"menuBtnStyle\" (tap)=\"toggleMenu()\" (panstart)=\"onPanStart()\" (panend)=\"onPanEnd()\"><span [@menuScaleInOut]=\"menuState.toString()\" (@menuScaleInOut.done)=\"animationDone($event)\">Menu </span><span class=\"btn-cross\" [@crossScaleInOut]=\"menuState.toString()\" (@crossScaleInOut.done)=\"animationDone($event)\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"cross\" class=\"img\" x=\"0px\" y=\"0px\" viewBox=\"0 0 212.982 212.982\" style=\"enable-background:new 0 0 212.982 212.982\" xml:space=\"preserve\" [attr.width]=\"menuOptions.Button.crossImgSize\" [attr.height]=\"menuOptions.Button.crossImgSize\"><g id=\"Close\"><path style=\"fill-rule:evenodd;clip-rule:evenodd\" [attr.fill]=\"menuOptions.Button.color\" d=\"M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z\"/></g></svg></span></button><div class=\"menu-list\" [ngStyle]=\"menuListStyle\"><app-menu-wing *ngFor=\"let wing of wings; let i = index\" [textAnchor]=\"textAnchor\" [textRotate]=\"textRotate\" [position]=\"positionClass\" [wing]=\"wing\" [svgPath]=\"svgPath\" [index]=\"i\" [menuState]=\"menuState\"></app-menu-wing></div></div>",
        styles: [".menu-container{position:fixed;z-index:99999}.menu-btn{-moz-box-shadow:-2px 6px 12px #8e8e8e;box-shadow:-2px 6px 12px #8e8e8e;outline:0;position:absolute;border:none;z-index:1000;cursor:pointer;-moz-border-radius:100%;border-radius:100%;background-color:#ff7f7f;color:#fff;font-size:14px}.menu-btn .img{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;pointer-events:none;vertical-align:middle;display:block}.menu-btn span{display:block;vertical-align:middle;pointer-events:none}.menu-btn .btn-cross{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto}.menu-list{pointer-events:none;position:absolute}"],
        animations: [
            core_1.trigger('menuScaleInOut', [
                core_1.state('false', core_1.style({
                    opacity: 1,
                    transform: 'scale(1)'
                })),
                core_1.state('true', core_1.style({
                    opacity: 0,
                    transform: 'scale(0)'
                })),
                core_1.transition('false <=> true', core_1.animate('300ms linear'))
            ]),
            core_1.trigger('crossScaleInOut', [
                core_1.state('true', core_1.style({
                    opacity: 1,
                    transform: 'scale(1)'
                })),
                core_1.state('false', core_1.style({
                    opacity: 0,
                    transform: 'scale(0)'
                })),
                core_1.transition('false <=> true', core_1.animate('300ms linear'))
            ])
        ],
    }),
    __metadata("design:paramtypes", [menu_options_service_1.MenuOptions])
], MenuContainerComponent);
exports.MenuContainerComponent = MenuContainerComponent;

//# sourceMappingURL=menu-container.component.js.map
