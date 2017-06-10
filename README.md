# Angular Fan Menu for web and mobile

Angular Fan Menu is an `angular component` for cool menu component for web and mobile, developed using `angularJS 4`, `CSS3`, `HTML5`.

### Features
- Highly Configurable component properties and methods
- Draggable
- Touch enabled
- Cool fan effect transitions

## Demo

View the [Demo here](https://danielykpan.github.io/ng2-fan-menu/).

## Getting Started

### Source Code 
- Install with [npm](https://www.npmjs.com): `npm install ng2-fan-menu --save`

- Setup with the below instructions.

### Usage

Include `FanMenuModule` module at your project root module(In most of the case, `FanMenuModule` should be included in `AppModule`).

```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FanMenuModule } from 'ng2-fan-menu';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FanMenuModule,
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Declare the config object and menu items as follows

```typescript

import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    public options = {
        spinable: true,
        buttonWidth: 40,
    };

    public wings = [
        {
            'title': 'iPad',
            'color': '#ea2a29',
            'icon': {'name': 'fa fa-tablet'}
        }, {
            'title': 'iMac',
            'color': '#f16729',
            'icon': {'name': 'fa fa-laptop'}
        }, {
            'title': 'iPhone',
            'color': '#f89322',
            'icon': {'name': 'fa fa-mobile'}
        }, {
            'title': 'iWatch',
            'color': '#ffcf14',
            'icon': {'name': 'fa fa-clock-o'}
        }
    ];
    
    public gutter = {
        top: 30,
    };
    
    public startAngles = {
        topLeft: -20,
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
```

Add the component and the corresponding config attributes to the html template or page of your app.

```html
<app-menu-container [options]="options"                     
                    [gutter]="gutter"                     
                    [startAngles]="startAngles"                     
                    [wings]="wings"></app-menu-container>
```
## Documentation

### Component Configuration

Once the component is added to the element, it can be configured with the following configuration attributes.

|Attribute|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`[options]`|attribute|Optional|`{}`| The menu option properties are below for details.|
|`[gutter]`|attribute|Optional|`{top: 130, left: 30, right: 30, bottom: 30}`|The space between the menu and the boundaries of the page window. The object can have four properties left, right, top, bottom with values to be defined in Number|
|`[startAngles]`|attribute|Optional|`{topLeft: 0, topRight: 90, bottomRight: 180, bottomLeft: 270}`|The angle when the menu open at four different positions and before it expands. The object can have four properties topLeft, topRight, bottomRight, bottomLeft with values to be defined in Number. The default value 'topLeft: 0' means the menu would open to 3 o'clock degree when the menu is in topLeft position. (topRight: 90 -> 6 o'clock, bootomRight: 180 -> 9 o'clock, bottomLeft: 270 -> 12 o'clock)|
|`[wings]`|Array [Object]|YES|`none`|Array of menu item objects. Each menu is an object. Refer to the Data Array - Menu Item Object Properties are below for details.|
|`(onWingSelected)`|Method|YES|`''`| Callback on menu item wing clicked. It returns the wing object which is be clicked|

### Config Menu Option Properties

|Property|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`font`|string|Optional|`'sans-serif'`| The font family of the whole menu. If you use other font family, remember to include the font style in your project.|
|`radius`|number|Optional|`200`| The radius of the menu wings from the center of the button. The measure unit is 'px'.|
|`defaultOpen`|Boolean|Optional|`true`| Open menu automatically on load.|
|`defaultPosition`|string|Optional|`topLeft`|Position at the which the menu appears on load. Possible values are `topLeft`, `topRight`, `bottomLeft`,`bottomRight`|
|`angle`|number|Optional|`30`|The angle at which each menu wing would expand when clicked.|
|`offset`|number|Optional|`25`|The gap between the menu button and the menu item wings. The measure unit is 'px'.|
|`showIcons`|boolean|Optional|`true`|A flag that determines whether to show or hide icons along with the text in menu item wing.|
|`onlyIcons`|boolean|Optional|`false`|A flag that determines whether to only show icons in the menu wings (hide the wing title).|
|`spinable`|boolean|Optional|`false`|A flag that determines whether the menu could be spun. It is recommended to set it true if your menu is out of the screen when it is expanded.|
|`buttonWidth`|number|Optional|`60`|The width of the menu button. The measure unit is 'px'.|
|`buttonBackgroundColor`|string|Optional|`'#ff7f7f'`|The background color of the menu button.|
|`buttonFontColor`|string|Optional|`'#ffffff'`|The font color of the menu button. This would be the cross image color when the mean is expanded|
|`buttonFontWeight`|number|Optional|`700`|The font weight of the menu button.|
|`buttonFontSize`|number|Optional|`14`|The font size of the menu button. The measure unit is 'px'.|
|`buttonCrossImgSize`|string|Optional|`'50%'`|The size of the menu cross image. The measure unit could 'px', 'em', '%' or 'rem'. Remember to include the measure unit when you set this property|
|`buttonOpacity`|number|Optional|`0.7`|The button would be blur if the menu is not expanded. Set it to 1 if you don't want any blur.|
|`wingFontSize`|number|Optional|`16`|The font size of the menu wing text. This is the general font size for all the menu wings. You could config the font size for a signal menu wing to override this when you set the wing. The measure unit is 'px'.|
|`wingFontWeight`|number|Optional|`600`|The font weight of the menu wing text. This is the general font weight for all the menu wings. You could config the font weight for a signal menu wing to override this when you set the wing.|
|`wingFontColor`|string|Optional|`'#ffffff'`|The font color of the menu wing text. This is the general font color for all the menu wings and their icons. You could config the font color for a signal menu wing to override this when you set the wing.|
|`wingIconSize`|number|Optional|`35`|The size of the menu wing icons. This is the general size for all the menu wings' icons. You could config the size for a signal menu wing icon to override this when you set the wing. The measure unit is 'px'.|
### Data Array - Menu Item Object Properties

- wings  - Array [menuWing]

- menuWing {} properties

|Property|Type|Required|Description|
|:--- |:--- |:--- |:--- |
|`title`|String|YES| Title of the menu item. |
|`color`|Hex Code|YES| Background color of the wing. |
|`titleColor`|Hex Code|YES| Text color of the title. |
|`icon`|Object|YES| Icon object properties. {"color":"#fff","name":"fa fa-tablet","size": 35} |

- the wing icon is font icon image. You can use [Fontawesome](http://fontawesome.io/), [Bootstrap](http://getbootstrap.com/components/) or any other font icon libraries. 
Remember to include all those font files and style files into your project.

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

--

The MIT License (MIT)
Copyright (c) 2016 Daniel Yaokun Pan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Author
Daniel YK Pan
