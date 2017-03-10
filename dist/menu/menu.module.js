"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var menu_container_component_1 = require("./menu-container.component");
var menu_options_service_1 = require("./menu-options.service");
var menu_wing_component_1 = require("./menu-wing.component");
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    core_1.NgModule({
        declarations: [
            menu_container_component_1.MenuContainerComponent,
            menu_wing_component_1.MenuWingComponent,
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
        ],
        exports: [
            menu_container_component_1.MenuContainerComponent,
        ],
        providers: [
            menu_options_service_1.MenuOptions,
        ]
    })
], MenuModule);
exports.MenuModule = MenuModule;

//# sourceMappingURL=menu.module.js.map
