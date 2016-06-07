var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
      font: '60pt Modak',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    if (music.name !== "dangerous" && gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    // game.add.sprite(0, 0, 'menu-bg');
    game.stage.backgroundColor = "#40322C"
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      game.state.start("Game");
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });
    // this.addMenuOption('Credits', function () {
    //   game.state.start("Credits");
    // });
    this.addMenuOption('Credits \uf1ce', function () {
      game.state.start("Credits");
    }, 'default' , "fa_style");

    /* adding UI icon*/
    this.OptionIcon = this.add.text( 100, 100, '\uf1ce', { fill : '#D7D7D7', font : '64px FontAwesome' });
    this.OptionIcon.anchor.setTo(0.5);
    /* adding UI icon*/
    this.mute = this.add.text( 100, 100, gameOptions.playMusic ? '\uf028':'\uf026', { fill : '#D7D7D7', font : '64px FontAwesome'});
    this.mute.x = game.world.width - this.mute.width * 2
    this.mute.y = game.world.height - this.mute.height * 2

    this.mute.anchor.setTo(0.5);

    makeIconBtn(this.mute, function (_mute) {
      console.log("Mute that ", music.volume)
        gameOptions.playMusic = !gameOptions.playMusic
        music.volume = gameOptions.playMusic ? 1 : 0;
        music.volume ? _mute.setText('\uf028') : _mute.setText('\uf026')
    },'randomCustom', fa_style)
    console.log(fa_style)

  },

  update: function() {
     this.OptionIcon.angle += 1
  }

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);


function makeIconBtn (txt, callback, className, _style){
      txt.anchor.setTo(0.5);
      txt.inputEnabled = true;

      txt.events.onInputUp.add(callback);
      txt.events.onInputOver.add(function (target) {
        target.setStyle(_style.navitem.hover);
      });
      txt.events.onInputOut.add(function (target) {
        target.setStyle(_style.navitem[className]);
      });
}
