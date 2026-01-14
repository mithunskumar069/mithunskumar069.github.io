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




/*=============== SCROLLREVEAL ===============*/

/*=============== REVEAL TIMELINE PANELS ONLY WHEN VISIBLE ===============*/
function revealTimelineItems(panelSelector) {
  ScrollReveal().reveal(`${panelSelector} .ms-item__left`, { origin: "left", distance: "40px" });
  ScrollReveal().reveal(`${panelSelector} .ms-item__right`, { origin: "right", distance: "40px" });
  ScrollReveal().reveal(`${panelSelector} .ms-item__center`, { origin: "bottom", distance: "20px" });
}





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
/* ============ EXPERIENCE TIMELINE ANIMATION ============ */
safeRun(() => {
  ScrollReveal().reveal(".ms-item__left", {
    origin: "left",
    distance: "40px",
    duration: 700,
    interval: 200
  });

  ScrollReveal().reveal(".ms-item__right", {
    origin: "right",
    distance: "40px",
    duration: 700,
    interval: 200
  });

  ScrollReveal().reveal(".ms-item__center", {
    origin: "bottom",
    distance: "20px",
    duration: 700,
    interval: 200
  });
});




/* ========== SAFE SECTION REVEAL (EXCEPT HOME) ========== */
safeRun(() => {
  const sections = document.querySelectorAll(".section:not(#home)");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => observer.observe(section));
});

/* ========== HERO ADVANCED LOAD ========== */
safeRun(() => {
  anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: '.home__subtitle',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    })
    .add({
      targets: '.home__title',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900
    }, '-=400')
    .add({
  targets: '.home__img img',
  opacity: [0, 1],
  translateY: [20, 0],
  duration: 1000
}, '-=600')

    .add({
      targets: '.home__tagline',
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 800
    }, '-=700')
    .add({
      targets: '.home__social a',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(120),
      duration: 600
    }, '-=600');
});
/* ========== ADVANCED SECTION REVEAL ========== */
safeRun(() => {
  ScrollReveal().reveal('.section__title', {
    origin: 'bottom',
    distance: '30px',
    duration: 700,
    delay: 100
  });

  ScrollReveal().reveal('.services__card, .skills__category, .project__item, .ms-item, .contact__item', {
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    interval: 120,
    easing: 'ease-out'
  });
});


/* ========== EMAILJS CONTACT FORM ========== */
(function () {
  emailjs.init("L_WQKbclnpBTYvH7p");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "Sending message...";
    status.style.color = "#aaa";

    emailjs.sendForm(
      "service_81s8z0m",      // ✅ CORRECT SERVICE
      "template_r4sdsws",     // ✅ CORRECT TEMPLATE
      this
    ).then(
      () => {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "#a18eff";
        form.reset();
      },
      (error) => {
        status.textContent = "❌ Failed to send message. Please try again.";
        status.style.color = "red";
        console.error("EmailJS Error:", error);
      }
    );
  });
})();
