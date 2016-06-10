var Game = function(game) {
  score = 0
};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFDcs5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },
  makeIconBtn: function(x, y, text, optionStyle, callback){
    var txt = game.add.text(x,y , text, optionStyle);
      txt.anchor.setTo(0.5);
      txt.inputEnabled = true;

      txt.events.onInputUp.add(callback);
      txt.events.onInputOver.add(function (target) {
        target.setStyle(fa_style.navitem.hover);
      });
      txt.events.onInputOut.add(function (target) {
        target.setStyle(fa_style.navitem[className]);
      });


      txt.x = txt.x - txt.width/2
      txt.y = txt.y + txt.height/2
      return txt

  },

  create: function () {
    this.stage.disableVisibilityChange = false;
    game.add.sprite(0, 0, 'stars');
    this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });


    this.pauseBtn = this.makeIconBtn(
      game.world.width,
      0,
      '\uf28c',
      { fill : cs.accent_color, font : '64px FontAwesome'},
      function (e) {
        // game.state.getCurrentState().pauseBtn.visible = false
        console.log("Game is Paused", e)
        var twn = game.add.tween(e).to( { fontSize: "300px", x: game.world.centerX, y:game.world.centerY }, 500, Phaser.Easing.Cubic.In, true, 200);
        // pause after tweening
        twn.onComplete.add(function () {
          game.paused = true
        })

      },this
    )
    this.pauseBtn.resetX = this.pauseBtn.x
    this.pauseBtn.resetY = this.pauseBtn.y
    // Add a input listener to unpause the game
    game.input.onDown.add(unpause, this);

    save()
  }
};

function unpause(event, pauseBtn, arg) {
  // Unpause the game
  var pauseBtn = event.game.state.getCurrentState().pauseBtn; // using closure here would make this cleaner...
  var bounds = pauseBtn.getBounds();
  console.log("unPause btn clicked", bounds, event.x, event.y)
  if(game.paused){
    var x1 = bounds.x, x2 = x1 + bounds.width,
        y1 = bounds.y, y2 = y1 + bounds.height;
    // Check if the click was inside the pauseBtn Bounds
    if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

      game.paused = false;
      // I'm not sure why but a negative found size does reduce the pause button back
      game.add.tween(pauseBtn).to( { fontSize: "-300px", x: pauseBtn.resetX, y: pauseBtn.resetY }, 500, Phaser.Easing.Cubic.In, true, 200);
    }
  } else {
    console.log("Game is Running")
  }
}

function save() {
  // var value = storage.getItem(key); // Pass a key name to get its value.
  if (dataStore){
    dataStore.setItem("_highScore", 100) //
  }
  // var value = storage.getItem(key); // Pass a key name to get its value.
  // storage.setItem(key, value) //
}
