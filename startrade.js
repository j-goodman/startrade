//STARTRADE

//On window load...
onload = function () {
  var game = new GameManager ();
  game.start();
  game.describePlanet(game.player);
  menuSetup();
};

// cssEffects.js
document.flash = function (el) {
  var currentColor = '#0ac'
  el.style.color = '#fff'
  el.style.transition = 'color .1s'
  setTimeout(function () {
    el.style.transition = ''
    el.style.color = currentColor;
  }, 150)
}

// MenuSetup.js
var menuSetup = function () {
  var selector = document.getElementById('menu-selector');

  var status = document.getElementById('status');
  var controls = document.getElementById('controls');
  var cargo = document.getElementById('cargo');
  var action = document.getElementById('action');
  var map = document.getElementById('map');
  var menu = [status, controls, cargo, action, map];

  menu.forEach(function (item) {
    item.onmouseover = function () {
      selector.innerText = this.id;
      document.flash(selector);
    }
    item.onmouseleave = function () {
      selector.innerText = '';
      document.flash(selector);
    }
  });
};

// KeyControls.js
onkeydown = function (event) {
  if (event.keyCode == '69') { // "e" key
    var container = document.getElementsByTagName('container')[0];
    if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullScreen) {
      container.webkitRequestFullScreen();
    }
  }
};

// Planet.js
var Planet = function (name) {
  this.name = name;
  this.location = {
    x: 0,
    y: 0,
    z: 0,
  };
  this.yields = [];
  this.docked = [];
  this.commodities = [];
};

// Commodities.js
var Commodity = function (name) {
  this.name = name;
};

var CommodityStock = function (commodity, amount) {
  this.commodity = commodity;
  this.amount = amount;
};

// Player.js
var Player = function (planet) {
  this.planet = planet;
};

// Gamemanager.js
var GameManager = function () {};

GameManager.prototype.start = function () {
  var chancartier = new Planet ("Chancartier");
  var silver = new Commodity ("silver");
  this.player = new Player (chancartier);
  chancartier.commodities.push(new CommodityStock (silver, 100));
};

GameManager.prototype.describePlanet = function (player) {
  console.log(player.planet.name);
  var stock; var i;
  for (i=0 ; i<player.planet.commodities.length ; i++) {
    stock = player.planet.commodities[i];
    console.log(stock.commodity.name + ": " + stock.amount);
  }
};
