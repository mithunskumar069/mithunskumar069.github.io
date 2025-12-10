/*==================== SAFE HELPER ====================*/
function safeRun(callback) {
  try { callback(); } catch (err) { console.warn("Animation error:", err); }
}

/*=============== SHOW MENU ===============*/
safeRun(() => {
  const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

  navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
  navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

  document.querySelectorAll('.nav__link').forEach(n =>
    n.addEventListener('click', () => navMenu.classList.remove('show-menu'))
  );
});

/*=============== HOME IMAGE ANIMATION ===============*/
safeRun(() => {
  anime({
    targets: '.home__img img',
    translateY: [-40, 0],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutQuad'
  });

  anime({
    targets: '.home__data h1, .home__data h2, .home__subtitle',
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 1500,
    delay: anime.stagger(200),
    easing: 'easeOutExpo'
  });
});

/*=============== SCROLLREVEAL ===============*/
/*=============== REVEAL TIMELINE PANELS ONLY WHEN VISIBLE ===============*/
function revealTimelineItems(panelSelector) {
  ScrollReveal().reveal(`${panelSelector} .ms-item__left`, { origin: "left", distance: "40px" });
  ScrollReveal().reveal(`${panelSelector} .ms-item__right`, { origin: "right", distance: "40px" });
  ScrollReveal().reveal(`${panelSelector} .ms-item__center`, { origin: "bottom", distance: "20px" });
}

/* Run only for Experience on page load */
revealTimelineItems("#panel-experience");

/* Run for Education when clicked */
document.querySelector("[data-target='education']").addEventListener("click", () => {
  setTimeout(() => revealTimelineItems("#panel-education"), 50);
});


/*=============== SWIPER PROJECTS ===============*/
safeRun(() => {
  new Swiper('.projects__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
});

/*=============== TIMELINE TOGGLE ===============*/
const toggleBtns = document.querySelectorAll(".ms-toggle__btn");
const experiencePanel = document.getElementById("panel-experience");
const educationPanel = document.getElementById("panel-education");
const thumb = document.querySelector(".ms-toggle__thumb");

toggleBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {

    toggleBtns.forEach(b => b.classList.remove("ms-active"));
    btn.classList.add("ms-active");

    thumb.style.transform = `translateX(${index * 100}%)`;

    if (btn.dataset.target === "experience") {
      experiencePanel.classList.add("ms-panel--active");
      educationPanel.classList.remove("ms-panel--active");
    } else {
      educationPanel.classList.add("ms-panel--active");
      experiencePanel.classList.remove("ms-panel--active");
    }
  });
});
/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
