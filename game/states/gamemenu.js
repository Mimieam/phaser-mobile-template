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

    // create a Menu group - only use full if we want to auto adjust the entire menu
    this.menuGroup = game.add.group();

    this.addMenuOption('Start \uf04b', function () {
      game.state.start("Game");
    }, 'default' , "fa_style", this.menuGroup);

    this.addMenuOption('\uf013 Options', function () {
      game.state.start("Options");
    }, 'default' , "fa_style", this.menuGroup);

    this.addMenuOption('Credits \uf25b', function () {
      game.state.start("Credits");
    }, 'default' , "fa_style", this.menuGroup);
    this.adjustBottom(10, 0, this.menuGroup)
    console.log(this.menuGroup)

    /* adding UI icon*/
    this.randomRotatingIcon = this.add.text( 0, 0, '\uf1ce', { fill : '#D7D7D7', font : '64px FontAwesome' });
    this.randomRotatingIcon.x = this.randomRotatingIcon.width /2
    this.randomRotatingIcon.y = this.randomRotatingIcon.height/2
    this.randomRotatingIcon.anchor.setTo(0.5);

    /* adding Mute icon*/
    this.mute = this.add.text(0, 0, gameOptions.playMusic ? '\uf028':'\uf026', { fill : '#D7D7D7', font : '40px FontAwesome'});
    this.adjustBottom(10, game.world.width, this.mute)

    // this.mute.anchor.setTo(0.5);

    makeIconBtn(this.mute, function (_mute) {
      console.log("Mute that ", music.volume)
        gameOptions.playMusic = !gameOptions.playMusic
        music.volume = gameOptions.playMusic ? 1 : 0;
        music.volume ? _mute.setText('\uf028') : _mute.setText('\uf026')
    },'randomCustom', fa_style)
    console.log(fa_style)

  },

  update: function() {
     this.randomRotatingIcon.angle += 1
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
