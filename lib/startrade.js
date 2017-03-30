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

// Map.js
setupMap = function () {
  var base = document.getElementById('map-base');
  var ctx = base.getContext('2d');
  ctx.beginPath();
  var x; var y;
  for (x=0 ; x<10 ; x++) {
    ctx.moveTo(x * 50, 0);
    ctx.lineTo(x * 50, 500);
  }
  for (y=0 ; y<10 ; y++) {
    ctx.moveTo(0, y * 50);
    ctx.lineTo(500, y * 50);
  }
  ctx.strokeStyle = '#0ac';
  ctx.stroke();
  drawPlanet(7, 9, 7, '#f41');
  drawPlanet(6, 7, 8, '#14f');
  drawPlanet(7.5, 8, 6, '#e2f');

  drawPlanet(3, 2, 1, '#e60');
  drawPlanet(0, 3, 2, '#0a4');
  drawPlanet(2, 1, 3, '#fe1');
};

drawPlanet = function (x, y, z, color) {
  var panel = document.getElementById('map-panel');
  var plane = document.createElement('CANVAS');
  var ctx = plane.getContext('2d');

  plane.style.display = 'inline';
  plane.style.position = 'absolute';
  plane.style.right = '26px';
  plane.style.transform = 'translateZ(' + (-86) * z + 'px)';
  plane.height = 500;
  plane.width = 920;
  plane.style.height = '500px';
  plane.style.width = '920px';

  ctx.moveTo(86 * x + 30, 500);
  ctx.lineTo(86 * x + 30, 520 - 50 * y);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(86 * x + 30, 500 - 50 * y, 20, 1.15 * 2*Math.PI, 0.6 * 2*Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(86 * x + 30, 500 - 50 * y, 10, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  panel.appendChild(plane);
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
