'use strict';

var Splash = function () {};
var dataStore = null;
    // playSound = true,
    // playMusic = true,
    // music;

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    // game.load.script('uuid', 'lib/bower_components/node-uuid/uuid.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('options', 'states/Options.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Analog Hero.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('blur-bg', 'assets/images/blur32x32.png');
    // game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion', 'FontAwesome'],
        urls: ['assets/style/theminion.css', 'assets/style/font-awesome.min.css']
      },
      google: {
          families: ['Sniglet', 'Modak']
      }
    }
  },
  connectDataStore: function(){
    dataStore = window.localStorage;
    if (dataStore){
      var _highScore = dataStore.getItem("_highScore") || 0;
      var _uuid = dataStore.getItem("_uuid") || uuid.v4();
      dataStore.setItem("_uuid", _uuid);
      console.log(_highScore, _uuid)
    }

  },
  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    // game.add.sprite(0, 0, 'stars');
    game.stage.backgroundColor = "#222222";
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.addLoadingIcon()
    this.connectDataStore()
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  loadUpdate: function(){
    this.loadingIcon.angle += 5
  },

  addLoadingIcon: function() {
        /* adding UI icon*/
    this.loadingIcon = this.add.text(game.world.centerX-(387/2), 400, '\uf1ce', { fill : '#D7D7D7', font : '64px FontAwesome' });
    this.loadingIcon.anchor.setTo(0.5);
  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    // music.play();
  },

  initDeviceRatio: function(){
    if (this.game.device.desktop)
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    else
    {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        // this.scale.setResizeCallback(this.gameResized, this);
        // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();
    this.initDeviceRatio();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
