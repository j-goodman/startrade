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
    }
    item.onmouseleave = function () {
      selector.innerText = '';
    }
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
      }.bind(this), 100)
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
