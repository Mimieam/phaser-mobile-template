'use strict';

var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
      font: '60pt Modak',
      fill: cs.heading_color,
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    console.log(music)
    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      music.volume = playMusic ? 1 : 0;
    });
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    });
    this.addMenuOption('\uf0a8 Back', function () {
      game.state.start("GameMenu");
    }, 'default', "fa_style" );
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
