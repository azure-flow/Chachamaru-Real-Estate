document.addEventListener("DOMContentLoaded", function () {

  // AOS
  if (typeof (AOS) !== "undefined") {
    AOS.init();
  }

  // Customer feedback slider (.swiper-feedback) (index-invest.html)
  // NOTE: This slider uses 6 slides that are 2x duplicates of 3 items.
  // We want pagination to show only 3 bullets while staying in sync as slides change.
  const feedbackSwiperEl = document.querySelector(".swiper-feedback");
  if (feedbackSwiperEl) {
    const feedbackOriginalSlides = feedbackSwiperEl.querySelectorAll(
      ".swiper-wrapper > .swiper-slide"
    );
    const feedbackSlideCount = feedbackOriginalSlides.length;
    const feedbackPageCount =
      feedbackSlideCount > 0 && feedbackSlideCount % 2 === 0
        ? feedbackSlideCount / 2
        : feedbackSlideCount;

    const renderFeedbackPagination = (swiper) => {
      const activePageIndex =
        feedbackPageCount > 0 ? swiper.realIndex % feedbackPageCount : 0;

      let html = "";
      for (let i = 0; i < feedbackPageCount; i++) {
        const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
        html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to slide ${i + 1}"></span>`;
      }
      return html;
    };

    const getClosestFeedbackSlideIndexForPage = (pageIndex, currentRealIndex) => {
      if (feedbackPageCount === feedbackSlideCount) return pageIndex;

      // Expecting a "double set": [0..pageCount-1] and [pageCount..slideCount-1]
      const a = pageIndex;
      const b = pageIndex + feedbackPageCount;
      if (b >= feedbackSlideCount) return a;
      return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
    };

    let feedbackSwiper;
    feedbackSwiper = new Swiper(".swiper-feedback", {
      centeredSlides: true,
      loop: true,
      speed: 700,
      spaceBetween: -20,
      slidesPerView: 1.15,
      pagination: {
        el: ".swiper-feedback-pagination",
        type: "custom",
        renderCustom: (swiper) => renderFeedbackPagination(swiper),
      },
      breakpoints: {
        768: {
          slidesPerView: 2.2,
          spaceBetween: 28,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 2.9,
          spaceBetween: 20,
        },
      },
      loopedSlides: feedbackSlideCount,
    });

    // Make custom bullets clickable (event delegation so it survives re-render)
    const feedbackPaginationEl = document.querySelector(".swiper-feedback-pagination");
    if (feedbackPaginationEl) {
      feedbackPaginationEl.addEventListener("click", (e) => {
        const bullet = e.target.closest("[data-swiper-pagination-index]");
        if (!bullet) return;
        const pageIndex = Number(bullet.getAttribute("data-swiper-pagination-index"));
        if (Number.isNaN(pageIndex)) return;

        const targetSlideIndex = getClosestFeedbackSlideIndexForPage(
          pageIndex,
          feedbackSwiper.realIndex
        );

        if (typeof feedbackSwiper.slideToLoop === "function") {
          feedbackSwiper.slideToLoop(targetSlideIndex);
        } else {
          feedbackSwiper.slideTo(targetSlideIndex);
        }
      });
    }
  }

  // Scale active/other slides for .swiper-consultation
  // NOTE: This swiper has 6 slides that are 2x duplicates of 3 items.
  // We want pagination to show only 3 bullets while staying in sync as slides change.
  const consultationSwiperEl = document.querySelector(".swiper-consultation");
  if (consultationSwiperEl) {
    const consultationOriginalSlides = consultationSwiperEl.querySelectorAll(
      ".swiper-wrapper > .swiper-slide"
    );
    const consultationSlideCount = consultationOriginalSlides.length;
    const consultationPageCount =
      consultationSlideCount > 0 && consultationSlideCount % 2 === 0
        ? consultationSlideCount / 2
        : consultationSlideCount;

    const renderConsultationPagination = (swiper) => {
      const activePageIndex =
        consultationPageCount > 0 ? swiper.realIndex % consultationPageCount : 0;

      let html = "";
      for (let i = 0; i < consultationPageCount; i++) {
        const activeClass = i === activePageIndex ? " swiper-pagination-bullet-active" : "";
        html += `<span class="swiper-pagination-bullet${activeClass}" data-swiper-pagination-index="${i}" role="button" tabindex="0" aria-label="Go to slide ${i + 1}"></span>`;
      }
      return html;
    };

    const getClosestSlideIndexForPage = (pageIndex, currentRealIndex) => {
      if (consultationPageCount === consultationSlideCount) return pageIndex;

      // Expecting a "double set": [0..pageCount-1] and [pageCount..slideCount-1]
      const a = pageIndex;
      const b = pageIndex + consultationPageCount;
      if (b >= consultationSlideCount) return a;
      return Math.abs(a - currentRealIndex) <= Math.abs(b - currentRealIndex) ? a : b;
    };

    let consultation_swiper;
    consultation_swiper = new Swiper(".swiper-consultation", {
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
        type: "custom",
        renderCustom: (swiper) => renderConsultationPagination(swiper),
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
      loopedSlides: consultationSlideCount,
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
              slide.style.backgroundColor = 'rgb(245,247,249)';
            });
          }
        }
      }
    });

    // Make custom bullets clickable (event delegation so it survives re-render)
    const consultationPaginationEl = document.querySelector(".swiper-consultation-pagination");
    if (consultationPaginationEl) {
      consultationPaginationEl.addEventListener("click", (e) => {
        const bullet = e.target.closest("[data-swiper-pagination-index]");
        if (!bullet) return;
        const pageIndex = Number(bullet.getAttribute("data-swiper-pagination-index"));
        if (Number.isNaN(pageIndex)) return;

        const targetSlideIndex = getClosestSlideIndexForPage(
          pageIndex,
          consultation_swiper.realIndex
        );

        if (typeof consultation_swiper.slideToLoop === "function") {
          consultation_swiper.slideToLoop(targetSlideIndex);
        } else {
          consultation_swiper.slideTo(targetSlideIndex);
        }
      });
    }
  }




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
const serviceToggleSlideBtnLabel = document.getElementById('serviceToggleSlideBtnLabel');
const serviceToggleSlideBtnIcon = document.getElementById('serviceToggleSlideBtnIcon');

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
      element.style.padding = '24px 24px';
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
      if (serviceToggleSlideBtnLabel) serviceToggleSlideBtnLabel.textContent = '閉じる';
      if (serviceToggleSlideBtnIcon) serviceToggleSlideBtnIcon.style.transform = 'rotate(180deg)';
    } else {
      slideUp(serviceSlideContent);
      if (serviceToggleSlideBtnLabel) serviceToggleSlideBtnLabel.textContent = 'もっとみる';
      if (serviceToggleSlideBtnIcon) serviceToggleSlideBtnIcon.style.transform = 'rotate(0deg)';
    }
    shown = !shown;
  });
}



