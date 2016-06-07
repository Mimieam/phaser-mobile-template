function makeMenuText (txt, callback, className, _style){
      txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);
      txt.inputEnabled = true;

      txt.events.onInputUp.add(callback);
      txt.events.onInputOver.add(function (target) {
        target.setStyle(_style.navitem.hover);
      });
      txt.events.onInputOut.add(function (target) {
        target.setStyle(_style.navitem[className]);
      });
}

var mixins = {
  addMenuOption: function(text, callback, className, fontOption, group) {
    this.makeMenuText = makeMenuText
    // use the className argument, or fallback to menuConfig, but
    // if menuConfig isn't set, just use "default"
    className || (className = this.menuConfig.className || 'default');

    // set the x coordinate to game.world.center if we use "center"
    // otherwise set it to menuConfig.startX
    var x = this.menuConfig.startX === "center" ?
      game.world.centerX :
      this.menuConfig.startX;

    // set Y coordinate based on menuconfig
    var y = this.menuConfig.startY;

    // set navigation style
    var _style
    if (fontOption == "fa_style"){
      _style = fa_style
      var re = /[^\u0000-\u0080]+/g
      array1 = text.split(re) // array of Words
      // a1 =  array1.join(" ").trim().split(" ")
      // array1 = array1.join(" ").trim().split(" ")
      array2 = text.match(re) // array of unicodes
      array3 = array2 != null ? utils.interleaveArrays(array1, array2) : array1


      var array4 = [] // will contain phaser txt object
      var w = 0

      // assign the right style to each type of word
      for (var word in array3) {
        _style = array1.indexOf(array3[word]) > -1 ?  style : fa_style
        var txt = game.add.text(
          x + w,
          (this.optionCount * 80) + y,
          array3[word],
           _style.navitem[className]
        );
        array4.push(txt)
        w += txt.width + 10
        // console.log(w ,array3[word], a1, a1.indexOf(array3[word]) > -1 ?  true: false)
        this.makeMenuText(txt, callback, className, _style)
        if (group) {
          group.add(txt)
        }
      }

      for (var idx in array4) { // centering bug fix... reposition the text element
        if (x == game.world.centerX) {
          console.log(array4[idx].w, x , w/2 , array4[idx].w)
          array4[idx].x = x - w/2 + array4[idx].width * ( idx ==0 ? 0:1)
        }
      }
    } else {
      _style = style
      var txt = game.add.text(
        x,
        (this.optionCount * 80) + y,
        text,
        _style.navitem[className]
      );

      this.makeMenuText(txt, callback, className,  _style)
      if (group) {
        group.add(txt)
      }
    }
    // create
    // use the anchor method to center if startX set to center.

    this.optionCount ++;
  },
  adjustBottom: function (margin, x, sprite){
    /*
      if x = 0 => align bottom left
      if x = game.width => align bottom right
      note: sprite can also be a group.
     */
    "undefined"==typeof margin&&(margin=0);
    var b=sprite.width/2+margin,
      c=sprite.height/2+margin;

    if (sprite.name == "group"){
      var gp = sprite
      // reset x to 0
      gp.x = 0
      // p
      gp.x -= gp.getLocalBounds().x,

      gp.x += (x != 0 ? x-margin : margin)
      // reset position to 0
      gp.y = 0
      // place it back to the top
      gp.y = gp.y - gp.getLocalBounds().y
      // now alight to the bottom
      gp.y = gp.y + game.height - gp.height - margin
      // sprite.y +=sprite.game.height-c
    }else {
      sprite.x= (x != 0 ? x-b : b)
      sprite.y=sprite.game.height-c
    }
  },
};

