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
var Commodity = function (name, symbol) {
  this.name = name;
  this.symbol = symbol;
};

var CommodityStock = function (commodity, amount) {
  this.commodity = commodity;
  this.amount = amount;
};

// Player.js
var Player = function (planet, commodities) {
  this.planet = planet;
  this.commodities = [
    new CommodityStock (commodities.silver, 11),
    new CommodityStock (commodities.fuel, 99),
    new CommodityStock (commodities.corn, 10),
  ];
};

// CargoHold.js
var populateCargo = function (player) {
  var hold = document.getElementById('cargo-hold');
  hold.innerHTML = '';
  player.commodities.forEach(function (stock) {
    var comm = document.createElement('COMMODITY');
    var name = document.createElement('TEXT');
    var amt = document.createElement('TEXT');
    name.innerText = stock.commodity.name;
    amt.innerText = stock.commodity.symbol + stock.amount.toString();

    var num = player.commodities.length;
    var iconSize; var fontSize;
    if (num <= 3) {
      iconSize = 173;
      fontSize = 32;
    } else if (num <= 4) {
      iconSize = 173;
      fontSize = 32;
    } else if (num <= 18) {
      iconSize = 107;
      fontSize = 19;
    } else if (num <= 28) {
      iconSize = 88;
      fontSize = 15;
    } else {
      iconSize = 60;
      fontSize = 12;
    }
    comm.appendChild(name); comm.appendChild(amt);
    comm.style.width = comm.style.height = iconSize;
    comm.style.fontSize = fontSize;
    hold.appendChild(comm);
  });
};

// Gamemanager.js
var GameManager = function () {};

GameManager.prototype.start = function () {
  var chancartier = new Planet ("Chancartier");
  var commodities = {
    silver: new Commodity ("silver", "🜛"),
    fuel: new Commodity ("fuel", "☲"),
    rice: new Commodity ("rice", "禾"),
    corn: new Commodity ("corn", "ϔ"),
    wheat: new Commodity ("wheat", "ϒ"),
    steel: new Commodity ("steel", "🜝"),
    textiles: new Commodity ("textiles", "⊞"),
    ore: new Commodity ("ore", "🜃"),
    gasses: new Commodity ("gasses", "🜁"),
  };
  this.player = new Player (chancartier, commodities);
  chancartier.commodities.push(new CommodityStock (commodities.silver, 100));
};

GameManager.prototype.describePlanet = function (player) {
  console.log(player.planet.name);
  var stock; var i;
  for (i=0 ; i<player.planet.commodities.length ; i++) {
    stock = player.planet.commodities[i];
    console.log(stock.commodity.name + ": " + stock.amount);
  }
};
