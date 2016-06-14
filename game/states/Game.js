'use strict';

var Game = function(game) {
  this.score = parseInt(dataStore.getItem("_highScore" ,10)) || 0
  // this.autoSave = true
  this.savingInterval = 30000 // every 30 sec
  this.lastSave = 0
  this.savedText = null;
};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = {
      font: '30pt Sniglet',
      fill: 'white',
      align: 'left',
      stroke: 'rgba(0,0,0,0)',
      srokeThickness: 4
    };

    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
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
        console.log(fa_style.navitem.default)
        target.setStyle(fa_style.navitem.default);
      });
      txt.events.onInputOut.add(function (target) {
        target.setStyle(fa_style.navitem.hover);
      });

      txt.x = txt.x - txt.width/2
      txt.y = txt.y + txt.height/2

      return txt

  },
  save: function() {
    // var value = storage.getItem(key); // Pass a key name to get its value.
    if (dataStore){
      dataStore.setItem("_highScore", this.score || 0) //
    }
    // var value = storage.getItem(key); // Pass a key name to get its value.
    // storage.setItem(key, value) //
  },
  create: function () {
    this.stage.disableVisibilityChange = false;

    // game.add.sprite(0, 0, 'stars');

    this.scoreText = game.make.text(game.world.centerX, 20, "Score: " + this.score, { font: '30pt Sniglet', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4});
    this.scoreText.x = game.world.centerX - this.scoreText.width/2
    game.add.existing(this.scoreText);

    this.savedText = game.make.text(game.world.centerX, game.world.centerY, "Auto\nSaved..", style.title.default);
    this.savedText.anchor.set(0.5);
    this.savedText.alpha = 0
    game.add.existing(this.savedText)

    this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });


    this.blurLayer = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'blur-bg');
    // this.blurLayer.visible = false
    this.blurLayer.alpha = 0

    this.pauseBtn = this.makeIconBtn(game.world.width, 0, '\uf28c',
      fa_style.btn.pause,
      function (btn) {

        var blurLayer = game.state.getCurrentState().blurLayer

        var blurTwn = game.add.tween(blurLayer).to( {alpha: 1}, 200, Phaser.Easing.Cubic.In, true, 200);
        var twn = game.add.tween(btn).to( {fontSize: "300px", x: game.world.centerX, y:game.world.centerY , backgroundColor:'rgba(200,200,200,0.5)'}, 500, Phaser.Easing.Cubic.In, true, 200);
        twn.onComplete.add(function () {
          // console.log(btn)
          game.paused = true;
        }) // pause after tweening
      }, this)

    this.pauseBtn.resetX = this.pauseBtn.x
    this.pauseBtn.resetY = this.pauseBtn.y

    game.input.onDown.add(unpause, this); // Add a input listener to unpause the game

    this.save()
  },
  update: function(){
    this.score += 0.05
    this.scoreText.setText( "Score: " + (this.score|1) );
    this.scoreText.x = game.world.centerX - this.scoreText.width/2;
    var _tm = game.time.time

    if (gameOptions.autoSave && _tm - this.lastSave >= this.savingInterval){
      this.save()
      this.lastSave = _tm
      this.savedText.visible = true
      tweenFeedBack(this.savedText)
      console.log("Saving")
    }
  }

};

function unpause(event, pauseBtn, arg) {
  // Unpause the game
  var pauseBtn = event.game.state.getCurrentState().pauseBtn; // using closure here would make this cleaner...
  var bounds = pauseBtn.getBounds();
  // console.log("unPause btn clicked", bounds, event.x, event.y)
  if(game.paused){
    var x1 = bounds.x, x2 = x1 + bounds.width,
        y1 = bounds.y, y2 = y1 + bounds.height;
    // Check if the click was inside the pauseBtn Bounds
    if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

      game.paused = false;
      // I'm not sure why but a negative found size does reduce the pause button back
      game.add.tween(pauseBtn).to( { fontSize: "-300px", x: pauseBtn.resetX, y: pauseBtn.resetY }, 500, Phaser.Easing.Cubic.In, true, 200);

      var blurLayer = game.state.getCurrentState().blurLayer
      game.add.tween(blurLayer).to( {alpha: 0}, 200, Phaser.Easing.Cubic.In, true, 200);

    }
  } else {
    console.log("Game is Running")
  }
}

function tweenFeedBack(item){
  var twn1 = game.add.tween(item).to( {y: "-30", alpha:1}, 1000, "Quart.easeOut"),
      twn2 = game.add.tween(item).to( {y: "30",  alpha:0 }, 1000, "Quart.easeOut");
  twn1.chain(twn2);
  twn1.start()
  return twn1



}
