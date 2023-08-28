window.onscroll = function () {
  myFunction();
};

var header = document.querySelector(".desktop-header-center");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
