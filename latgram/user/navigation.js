/*
Navigationsmen�
Autor: Justus Henneberg
*/
function Mausbewegung (Ereignis) {
if (!Ereignis)
  Ereignis = window.event;
X = Ereignis.clientX;
if (X < 20) {
if (typeof document.body.scrollTop == "number")
  document.getElementById("navi").style.top = document.body.scrollTop + 60;
if (typeof window.pageYOffset == "number")
  document.getElementById("navi").style.top = window.pageYOffset + 60;
document.getElementById("navi").style.visibility = "visible";
}
if (X > 220) {
document.getElementById("navi").style.visibility = "hidden";
}
}
document.onmousemove = Mausbewegung;
