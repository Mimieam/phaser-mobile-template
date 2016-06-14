# phaser-game-template
This project was extended from the awesome project by MattMcFarland [phaser-menu-system](https://github.com/MattMcFarland/phaser-menu-system) and adapted to be responsive for Mobiles and tablets, please make sure to have a look at the original one :).

The real motivation behind this project is that I couldn't find any decently complete boilerplate ( not overbloated with build stuff and not overly simplistic - only 1 view type of stuff ) that I could start hacking right away and which handled most of the common use cases encountered when starting out with phaser.

To try out this project, fork it and load the `game` as the root of our local dev server (i.e. `python -m SimpleHTTPServer 9099`)






##Features

- [x] mobile friendly
- [x] support for fontAwesome
- [x] spacing of menu item adjustable
- [x] auto adjusting to the bottom of the screen

add ons:
- [x] pause / resume button
- [x] mute button
- [x] autoSave (using localStorage as data store)
- [x] circular loading indicator with percentage (done but not added yet)
- [x] handle screen orientation (done but not added yet)
- [x] google webfonts

ToDO:
- [ ] fix credit landscape back btn
- [ ] scoreboard
- [ ] easier color scheme styling ()
- [ ] cleaning and refactoring



---
###Font Awesome:
Currently only the unicode value of the icons are supported for instance,
to use **fa-arrow-circle-left** simply place its unicode value (**f0a8**) in a text string like so **\uf0a8**.

```javascript
var txtStyle = { fill : cs.accent_color, font : '64px FontAwesome' }
var txtIcon = this.add.text( game.world.centerX, game.world.centerY, '\uf0a8', txtStyle);
```
Note: I couldn't get `fontFamily` or `fontSize` to work with FontAwesome separately so currently `font` must be used.

To add an Icon to a menu Option:

```javascript
   this.addMenuOption('\uf0a8 Back', function () {
      game.state.start("GameMenu");
    }, 'default', "fa_style", this.menuGroup);
```

```javascript
function addMenuOption (text, callback, className, fontOption, group) {
  /*
    text: label text
    callback: on click callback
    classNameName: the style to be applied to Ascii portion of the label
    fontOption: the style to be applied to the Unicode portion of the label
    group: a group to which the current menu option will belong to (used to adjust all options )

   **/

}
```

to adjust anything @ the bottom of the screen:
```javascript

  this.adjustBottom(margin, x_pos, phaserObject) {
  /*
    margin: margin from the bottom
    x_pos: horizontal position
    phaserObject: a Sprite, a group or anything else.
   */
  }
```

Centering a menu at the bottom of the screen
```javascript
  this.adjustBottom(20, game.world.centerX - this.menuGroup.width/2, this.menuGroup)
```

## Screenshots
![alt text][img]

## Acknowledgments
[MattMcFarland](https://github.com/MattMcFarland/phaser-menu-system) for his tutorials.



[img]: https://raw.githubusercontent.com/Mimieam/phaser-mobile-template/master/doc/landscape%20and%20portrait.png "demo"
[alt text]: screenshots


Thank you :)
