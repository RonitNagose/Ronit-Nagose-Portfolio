document.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  function openDrawer(){
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if(hamburger) hamburger.addEventListener('click', openDrawer);
  if(closeDrawer) closeDrawer.addEventListener('click', close);

  // Close when tapping outside drawer content on mobile
  mobileDrawer.addEventListener('click', (e)=>{
    if(e.target === mobileDrawer) close();
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        close();
      }
    })
  });

    // simple clock update
  const clocks = document.querySelectorAll('.clock');
  function updateClock(){
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2,'0');
    const mins = now.getMinutes().toString().padStart(2,'0');
    clocks.forEach(c=>c.textContent = `${hrs}:${mins}`);
  }
  updateClock();
  setInterval(updateClock, 60*1000);
});


// Music Logic


// function loadPage(page, element){
//   // Load page content
//   fetch(page)
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById("content").innerHTML = data;
//     });

//   // Remove active from all links
//   const links = document.querySelectorAll(".sidebar .nav-link");
//   links.forEach(link => link.classList.remove("active"));

//   // Add active to clicked link
//   element.classList.add("active");

//   const drawer = document.querySelector("#mobileDrawer");
//   if (drawer) {
//     drawer.classList.remove("open");
//     document.body.style.overflow = "";
// }
// }

// window.onload = function () {
//   const firstLink = document.querySelector(".sidebar .nav-link");

//   loadPage("intro.html",firstLink);
// };


function loadPage(page){
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
    });

  // CLOSE MOBILE DRAWER
  const mobileDrawer = document.getElementById("mobileDrawer");
  if(mobileDrawer){
    mobileDrawer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadPage("intro.html");
});

document.addEventListener("DOMContentLoaded", () => {

  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicBtn");

  if(button && music){

    button.addEventListener("click", () => {

      if (music.paused) {
        music.play();
        button.classList.add("active");
      } 
      else {
        music.pause();
        button.classList.remove("active");
      }

      button.blur();
    });

    // keep UI synced with audio state
    music.addEventListener("pause", () => {
      button.classList.remove("active");
    });

    music.addEventListener("play", () => {
      button.classList.add("active");
    });

  }

});