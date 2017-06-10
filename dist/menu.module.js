"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var menu_container_component_1 = require("./menu-container.component");
var menu_options_service_1 = require("./menu-options.service");
var menu_wing_component_1 = require("./menu-wing.component");
var menu_spin_service_1 = require("./menu-spin.service");
require("hammerjs");
var FanMenuModule = (function () {
    function FanMenuModule() {
    }
    return FanMenuModule;
}());
FanMenuModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    menu_container_component_1.MenuContainerComponent,
                    menu_wing_component_1.MenuWingComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    animations_1.BrowserAnimationsModule,
                ],
                exports: [
                    menu_container_component_1.MenuContainerComponent,
                ],
                providers: [
                    menu_options_service_1.MenuOptions,
                    menu_spin_service_1.SpinService,
                ]
            },] },
];
FanMenuModule.ctorParameters = function () { return []; };
exports.FanMenuModule = FanMenuModule;
//# sourceMappingURL=menu.module.js.map