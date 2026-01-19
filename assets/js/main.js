document.addEventListener("DOMContentLoaded", function () {

  // AOS
  if (typeof(AOS) !== "undefined") {
    AOS.init();
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

  // Header background change on scroll for index.html (smartphone only)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (currentPage === "index.html") {
    const header = document.querySelector("header");

    if (header) {
      function updateIndexHeaderBackground() {
        const scrollPosition = window.pageYOffset;
        const isMobile = window.innerWidth < 768; // md breakpoint

        if (isMobile) {
          // Only apply on smartphone
          if (scrollPosition > 500) {
            // Change to bg-[#e2f5ff] when scrolled past 300px
            // Remove bg-white but keep md:bg-[#e2f5ffb3] for desktop
            if (header.classList.contains("bg-white")) {
              header.classList.remove("bg-white");
            }
            if (!header.classList.contains("bg-[#e2f5ff]")) {
              header.classList.add("bg-[#e2f5ff]");
            }
          } else {
            // Change back to bg-white when at top (mobile only)
            header.classList.remove("bg-[#e2f5ff]");
            if (!header.classList.contains("bg-white")) {
              header.classList.add("bg-white");
            }
          }
        }
        // On desktop, the existing md:bg-[#e2f5ffb3] class handles it automatically
      }

      // Event listeners
      window.addEventListener("scroll", updateIndexHeaderBackground);
      window.addEventListener("resize", updateIndexHeaderBackground); // Update on resize

      // Initial check
      updateIndexHeaderBackground();
    }
  }

  // Header background change on scroll (exclude index.html and news-sub.html)
  if (currentPage !== "index.html" && currentPage !== "news-sub.html") {
    const heroSection = document.getElementById("hero-section");
    const header = document.querySelector("header");

    if (heroSection && header) {
      function updateHeaderBackground() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;
        const isMobile = window.innerWidth < 768; // md breakpoint

        if (scrollPosition > heroHeight) {
          // Remove all background classes first
          header.classList.remove("bg-white", "bg-[#e2f5ffb3]", "bg-[#e2f5ff]");

          if (isMobile) {
            // On smartphone: use bg-[#e2f5ff]
            header.classList.add("bg-[#e2f5ff]");
          } else {
            // On desktop: use bg-[#e2f5ffb3] with hover effect
            header.classList.add("bg-[#e2f5ffb3]");
            header.classList.add("hover:bg-[#e2f5ff]");
          }
        } else {
          // Change back to bg-white when at top
          header.classList.remove(
            "bg-[#e2f5ffb3]",
            "bg-[#e2f5ff]",
            "hover:bg-[#e2f5ff]"
          );
          header.classList.add("bg-white");
        }
      }

      // Event listeners
      window.addEventListener("scroll", updateHeaderBackground);
      window.addEventListener("resize", updateHeaderBackground); // Update on resize

      // Initial check
      updateHeaderBackground();
    }
  }

  const initiativeSwiperEl = document.querySelector(".swiper-initiative");
  if (initiativeSwiperEl) {
    new Swiper(".swiper-initiative", {
      slidesPerView: 1.1,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
      speed: 900,
      loop: true,
      centeredSlides: false,
      autoplay: {
          delay: 3400,
          disableOnInteraction: false
      },
      navigation: {
        nextEl: ".initiative-swiper-next",
        prevEl: ".initiative-swiper-prev",
      },
    });
  }

  // News Swiper - Mobile slider (1 slide on mobile, 3 slides on desktop)
  const newsSwiperEl = document.querySelector(".swiper-news");
  if (newsSwiperEl) {
    new Swiper(".swiper-news", {
      slidesPerView: 1,
      spaceBetween: 32,
      speed: 600,
      loop: true,
      navigation: {
        nextEl: ".news-swiper-next",
        prevEl: ".news-swiper-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  const brandSwiperEl = document.querySelector(".swiper-brands");
  if (brandSwiperEl) {
    const swiperBrands = new Swiper(".swiper-brands", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 31,
      breakpoints: {
        768: {
          spaceBetween: 40,
        },
      },
      speed: 8000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }
  const swiperBrands02 = new Swiper(".swiper-brands02", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 31,
    speed: 8000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true, // 追加: スライドの方向を逆にする
    },
  });
  const swiperCompanyBrands01 = new Swiper(".swiper-company-brands01", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 31,
    breakpoints: {
      1440: {
        spaceBetween: 62,
      },
    },
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
  const swiperCompanyBrands02 = new Swiper(".swiper-company-brands02", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 31,
    breakpoints: {
      1440: {
        spaceBetween: 62,
      },
    },
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true, // 追加: スライドの方向を逆にする
    },
  });

  // ------------------------------------------------------------

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menu_modal = document.getElementById("menu_modal");

  function toggleModal() {
    if (menu_modal.classList.contains("opacity-0")) {
      // open
      menu_modal.classList.remove("pointer-events-none", "opacity-0");
      menu_modal.classList.add("pointer-events-auto", "opacity-100");
    } else {
      // close
      menu_modal.classList.add("opacity-0");
      menu_modal.classList.remove("opacity-100", "pointer-events-auto");
      menu_modal.classList.add("pointer-events-none");
      document.body.style.overflow = "";
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleModal);
  }

  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      !menu_modal.classList.contains("opacity-0")
    ) {
      toggleModal();
    }
  });

  // Video/Image interaction handlers
  function setupVideoImageInteraction(
    videoId,
    imageId,
    videoContainerId,
    videoPlayBtnId,
    mobilePlayBtnId
  ) {
    const video = document.getElementById(videoId);
    const image = document.getElementById(imageId);
    const videoContainer = document.getElementById(videoContainerId);
    const videoPlayBtn = document.getElementById(videoPlayBtnId);
    const mobilePlayBtn = document.getElementById(mobilePlayBtnId);
    const container = videoContainer?.parentElement;

    if (!video || !image || !videoContainer || !container) return;

    let isVideoPlaying = false;
    const isMobile = window.innerWidth < 768;

    // Set video playback rate
    video.playbackRate = 5.0;
    video.addEventListener("play", () => {
      video.playbackRate = 5.0;
    });

    // Function to show video with fade
    function showVideo() {
      image.style.opacity = "0";
      videoContainer.style.opacity = "1";
      videoContainer.style.pointerEvents = "auto";
    }

    // Handle outside click for mobile
    let outsideClickHandler = null;

    // Function to add outside click listener
    function addOutsideClickListener() {
      if (isMobile && !outsideClickHandler) {
        outsideClickHandler = (e) => {
          if (!container.contains(e.target) && isVideoPlaying) {
            hideVideo();
          }
        };
        setTimeout(() => {
          document.addEventListener("click", outsideClickHandler);
        }, 100);
      }
    }

    // Function to remove outside click listener
    function removeOutsideClickListener() {
      if (outsideClickHandler) {
        document.removeEventListener("click", outsideClickHandler);
        outsideClickHandler = null;
      }
    }

    // Function to hide video and show image with fade
    function hideVideo() {
      video.pause();
      video.currentTime = 0;
      isVideoPlaying = false;
      videoPlayBtn.style.opacity = "1";
      videoContainer.style.opacity = "0";
      videoContainer.style.pointerEvents = "none";
      image.style.opacity = "1";
      // Remove outside click listener on mobile
      if (isMobile) {
        removeOutsideClickListener();
      }
    }

    // Desktop: Hover to show video
    if (!isMobile) {
      container.addEventListener("mouseenter", () => {
        showVideo();
      });

      container.addEventListener("mouseleave", () => {
        hideVideo();
      });

      // Click play button on video to play
      videoPlayBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        video.play();
        isVideoPlaying = true;
        videoPlayBtn.style.opacity = "0";
      });

      // Click on video area (not play button) to stop and hide
      video.addEventListener("click", (e) => {
        if (e.target === video && isVideoPlaying) {
          hideVideo();
        }
      });
    }

    // Mobile: Click play button on image to show and play video
    if (isMobile) {
      mobilePlayBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showVideo();
        video.play();
        isVideoPlaying = true;
        videoPlayBtn.style.opacity = "0";
        addOutsideClickListener();
      });

      // Mobile: Click on video play button to play
      videoPlayBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isVideoPlaying) {
          video.play();
          isVideoPlaying = true;
          videoPlayBtn.style.opacity = "0";
          addOutsideClickListener();
        }
      });

      // Mobile: Click anywhere on video container (except play button) to stop
      videoContainer.addEventListener("click", (e) => {
        // Don't stop if clicking the play button
        if (e.target === videoPlayBtn || videoPlayBtn?.contains(e.target)) {
          return;
        }
        // Stop video if it's playing
        if (isVideoPlaying) {
          hideVideo();
        }
      });
    }

    // Update play button visibility when video is playing
    video.addEventListener("play", () => {
      videoPlayBtn.style.opacity = "0";
    });

    video.addEventListener("pause", () => {
      if (video.currentTime > 0) {
        videoPlayBtn.style.opacity = "1";
      }
    });
  }

  // Setup for both video/image pairs
  setupVideoImageInteraction(
    "fast-video-01",
    "image-01",
    "video-container-01",
    "video-play-btn-01",
    "mobile-play-btn-01"
  );

  setupVideoImageInteraction(
    "fast-video-02",
    "image-02",
    "video-container-02",
    "video-play-btn-02",
    "mobile-play-btn-02"
  );
});
