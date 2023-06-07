$(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
      $("#top-bar").css("background-color", "rgba(37, 37, 37, 0.9)");
    }
    else{
      $("#top-bar").css("background-color", "transparent");  	
    }
  });
});

document.getElementById("normas-menu").addEventListener("click", function() {
  var submenu = document.getElementById("normas-submenu");
  if (submenu.style.display === "none") {
    submenu.style.display = "block";
  } else {
    submenu.style.display = "none";
  }
});
  


