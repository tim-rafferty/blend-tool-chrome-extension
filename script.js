var lastScrollHeight = 0;
function autoScroll() {
  var sh = document.documentElement.scrollHeight;
  if (sh != lastScrollHeight) {
    lastScrollHeight = sh;
    document.documentElement.scrollTop = sh;
  }
}
window.setInterval(autoScroll, 100);