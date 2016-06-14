'use strict';

var Options = function(game) {

};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center",
    verticalSpacing: (game.world.height > game.world.width ? 80 : 60)
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Game Title", style.title.default);
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic,
        autoSave = gameOptions.autoSave;

    game.add.existing(this.titleText);

    this.menuGroup = game.add.group();

    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      music.volume = playMusic ? 1 : 0;
    },'', "", this.menuGroup);

    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      target.text = playSound ? 'Mute Sound' : 'Play Sound';
    },'', "", this.menuGroup);

    this.addMenuOption(autoSave ? 'AutoSave On' : 'AutoSave Off', function (target) {
      autoSave = !autoSave;
      target.text = autoSave ? 'AutoSave On' : 'AutoSave Off';
      gameOptions.autoSave = autoSave
    },'', "", this.menuGroup);

    this.addMenuOption('\uf0a8 Back', function () {
      game.state.start("GameMenu");
    }, 'default', "fa_style", this.menuGroup);

    this.adjustBottom(20, this.game.world.centerX - this.menuGroup.width/2, this.menuGroup)
  },

};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
