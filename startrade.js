onload = function () {
  var game = new GameManager ();
  game.start();
  game.describePlanet(game.player);
};

onkeydown = function () {
  if (event.keyCode == '69') { // "e" key
    var container = document.getElementsByTagName('container')[0];
    if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullScreen) {
      container.webkitRequestFullScreen();
    }
  }
};

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

var Commodity = function (name) {
  this.name = name;
};

var CommodityStock = function (commodity, amount) {
  this.commodity = commodity;
  this.amount = amount;
};

var Player = function (planet) {
  this.planet = planet;
};

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
