document.addEventListener("DOMContentLoaded", function () {

  // AOS
  if (typeof (AOS) !== "undefined") {
    AOS.init();
  }



  // Scale active/other slides for .swiper-consultation
  const consultation_swiper = new Swiper(".swiper-consultation", {
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-consultation-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-consultation-right-nav-btn",
      prevEl: ".swiper-consultation-left-nav-btn",
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
      },
      1024: {
        slidesPerView: 1.5,
      },
      1280: {
        slidesPerView: 1.5,
      },
    },
    loopedSlides: document.querySelectorAll('.swiper-consultation .swiper-slide').length,
    on: {
      init: function () {
        if (window.innerWidth >= 1024) { // Apply only on PC
          this.slides.forEach((slide, idx) => {
            if (idx === this.activeIndex) {
              slide.style.transform = 'scale(1.1)';
              slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(245,247,249)';
            } else {
              slide.style.transform = 'scale(0.9)';
              slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(186,191,200)';
            }
          });
        } else {
          // Reset scale for mobile/tablet
          this.slides.forEach((slide) => {
            slide.style.transform = '';
            slide.style.transition = 'background-color 0.7s ease';
            slide.style.backgroundColor = 'rgb(186,191,200)';
          });
        }
      },
      slideChange: function () {
        if (window.innerWidth >= 1024) { // Apply only on PC
          this.slides.forEach((slide, idx) => {
            if (idx === this.activeIndex) {
              slide.style.transform = 'scale(1.1)';
              slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(245,247,249)';
            } else {
              slide.style.transform = 'scale(0.9)';
              slide.style.transition = 'transform 1s ease-out, background-color 0.7s ease';
              slide.style.backgroundColor = 'rgb(186,191,200)';
            }
          });
        } else {
          // Reset scale for mobile/tablet
          this.slides.forEach((slide) => {
            slide.style.transform = '';
            slide.style.transition = 'background-color 0.7s ease';
            slide.style.backgroundColor = 'rgb(186,191,200)';
          });
        }
      }
    }
  });




  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    function toggleScrollToTopButton() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        scrollToTopBtn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
        scrollToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
      }
    }

    // Scroll to top function
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Event listeners
    window.addEventListener("scroll", toggleScrollToTopButton);
    scrollToTopBtn.addEventListener("click", scrollToTop);

    // Initial check
    toggleScrollToTopButton();
  }

  // ------------------------------------------------------------

  // Mobile Navigation Slide Animation
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeNavBtn = document.getElementById("closeNavBtn");

  function openMobileNav() {
    if (mobileNav && window.innerWidth < 768) {
      // Temporarily remove max-height to get the natural height
      mobileNav.style.maxHeight = "none";
      hamburgerBtn.style.display = "none";
      const height = mobileNav.scrollHeight;
      // Set back to 0 to prepare for animation
      mobileNav.style.maxHeight = "0";
      // Force reflow
      mobileNav.offsetHeight;
      // Now animate to the actual height
      requestAnimationFrame(() => {
        mobileNav.style.maxHeight = height + "px";
        mobileNav.classList.add("menu-open");
      });
    }
  }

  function closeMobileNav() {
    if (mobileNav && window.innerWidth < 768) {
      // Get current height
      const height = mobileNav.scrollHeight;
      mobileNav.style.maxHeight = height + "px";
      // Force reflow
      mobileNav.offsetHeight;
      // Animate to 0
      requestAnimationFrame(() => {
        mobileNav.style.maxHeight = "0";
        mobileNav.classList.remove("menu-open");
      });
      hamburgerBtn.style.display = "block";
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (closeNavBtn) {
    closeNavBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Escape" || e.key === "Esc") && mobileNav && mobileNav.classList.contains("menu-open")) {
      closeMobileNav();
    }
  });

  // Reset menu state on window resize (if resizing from mobile to desktop)
  window.addEventListener("resize", function () {
    if (mobileNav && window.innerWidth >= 768) {
      mobileNav.style.maxHeight = "";
      mobileNav.classList.remove("menu-open");
    }
  });

});

// Service Toggle Slide Button



// Service Toggle Slide Button

// Grab elements
const serviceToggleSlideBtn = document.getElementById('serviceToggleSlideBtn');
const serviceSlideContent = document.getElementById('serviceSlideContent');

// Slide down utility
function slideDown(element) {
  element.style.display = 'flex';
  element.style.height = 'auto';
  let height = element.scrollHeight + 'px';
  element.style.height = '0px';
  if (window.innerWidth < 768) {
    element.style.padding = '0px 24px';
  } else {
    element.style.padding = '0px 82px';
  }
  element.style.marginTop = '0px';

  setTimeout(() => {
    element.style.duration = '0.5s';
    element.style.height = height;
    if (window.innerWidth < 768) {
      element.style.padding = '40px 24px';
    } else {
      element.style.padding = '48px 82px';
    }
    element.style.marginTop = '40px';
  }, 10);

  element.addEventListener('transitionend', function handler() {
    element.style.height = 'auto';
    element.style.transition = '';
    element.removeEventListener('transitionend', handler);
  });
}

// Slide up utility
function slideUp(element) {
  element.style.height = element.scrollHeight + 'px';
  if (window.innerWidth < 768) {
    element.style.padding = '40px 24px';
  } else {
    element.style.padding = '48px 82px';
  }
  element.style.marginTop = '40px';
  setTimeout(() => {
    element.style.duration = '0.5s';
    element.style.height = '0px';
    if (window.innerWidth < 768) {
      element.style.padding = '0px 24px';
    } else {
      element.style.padding = '0px 82px';
    }
    element.style.marginTop = '0px';
  }, 10);

  element.addEventListener('transitionend', function handler() {
    element.style.display = 'none';
    element.style.transition = '';
    element.removeEventListener('transitionend', handler);
  });
}

// State
let shown = false;
if (serviceToggleSlideBtn) {
  serviceToggleSlideBtn.addEventListener('click', function () {
    if (!shown) {
      slideDown(serviceSlideContent);
      serviceToggleSlideBtn.innerHTML = '閉じる &nbsp;&nbsp; ×';
    } else {
      slideUp(serviceSlideContent);
      serviceToggleSlideBtn.innerHTML = 'もっとみる &nbsp;&nbsp; ⋁';
    }
    shown = !shown;
  });
}