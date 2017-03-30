//STARTRADE

//On window load...
onload = function () {
  var game = new GameManager ();
  game.start();
  game.describePlanet(game.player);
  menuSetup(game);
  populateCargo(game.player);
  setupMap(game);
};

// cssEffects.js
document.flash = function (el) {
  var currentColor = '#0ac';
  el.style.color = '#fff';
  el.style.transition = 'color .1s';
  setTimeout(function () {
    el.style.transition = '';
    el.style.color = currentColor;
  }, 150);
};

// MenuSetup.js
var menuSetup = function (game) {
  var selector = document.getElementById('menu-selector');

  var status = document.getElementById('status');
  // var controls = document.getElementById('controls');
  var cargo = document.getElementById('cargo');
  // var action = document.getElementById('action');
  var map = document.getElementById('map');

  // var menu = [status, controls, cargo, action, map];
  var menu = [status, cargo, map];
  var slides = {
    status: document.getElementById('status-panel'),
    controls: document.getElementById('controls-panel'),
    cargo: document.getElementById('cargo-panel'),
    action: document.getElementById('action-panel'),
    map: document.getElementById('map-panel'),
  };

  menu.forEach(function (item) {
    item.onmouseover = function () {
      selector.innerText = this.id;
      document.flash(selector);
    };
    item.onmouseleave = function () {
      selector.innerText = '';
    };
    item.onclick = function () {
      var i;
      for (i=0 ; i<5 ; i++) {
        slides[Object.keys(slides)[i]].className = '';
      }
      slides[this.id].className = 'active';
      slides[this.id].style.transform = 'rotateY(16deg) rotateX(' + -180 + 'deg)';
      slides[this.id].style.opacity = 0;
      setTimeout(function () {
        slides[this.id].style.transform = 'rotateY(16deg) rotateX(' + 0 + 'deg)';
        slides[this.id].style.opacity = 1;
      }.bind(this), 100);
    };
  });

  var currentOnclick = cargo.onclick.bind(cargo);
  cargo.onclick = function () {
    populateCargo(game.player);
    currentOnclick();
  };
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
