function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function switchPage() {
  move('.cover').set('opacity', 0).duration('0.6s').scale(0.1).end();
  setTimeout(function() {window.location.assign('html/index.html');}, 1000);
}

var counter = 3;
function countDown() {
  setInterval(function() {
    if(counter > 0) {
      document.querySelector(".btn-success").innerText = "Accéder au système (" + counter + ")";
      --counter;
    }

    else {
      switchPage();
    }
  }, 990);
}

function initHome() {
  move('.cover').duration('1s').scale(0.2).then().duration('1s').scale(5).end();
  
  var interval = setInterval(function() {
    move('.cover-bar').add('width', 100).end();
    var cbw = replaceAll("px", "", document.querySelector('.cover-bar').style.width);
    var cpw = replaceAll("px", "", document.querySelector('.cover-progress').style.width);
    if(cbw > cpw) {
      clearInterval(interval);
      document.querySelector(".btn-warning").className = "btn btn-lg btn-success";
      document.querySelector(".btn-success").innerText = "Accéder au système (" + counter + ")";
      document.querySelector(".warning-heading").className = "cover-heading success-heading";
      document.querySelector(".success-heading").innerText = "Chargement terminé !";
      document.querySelectorAll(".lead")[0].innerText = "Vous pouvez désormais accéder au système de façon sécurisée";
      countDown();
    }
  }, 750);
  
  setInterval(function() {
    move('.cover-bar').duration('1s').set('opacity', .2).end();
    setTimeout(function() {
      move('.cover-bar').duration('1s').set('opacity', 1).end();
    }, 500);
  }, 1000);
}