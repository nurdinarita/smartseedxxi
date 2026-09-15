document.addEventListener("DOMContentLoaded", () => {
  const welcomeModal = document.getElementById("welcomeModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Fungsi untuk memblokir scroll fisik (touch & wheel)
  function preventDefaultScroll(e) {
    e.preventDefault();
  }

  // Kunci scroll total saat pop up pertama kali muncul
  document.body.classList.add("modal-open");
  document.documentElement.classList.add("modal-open");
  window.addEventListener("wheel", preventDefaultScroll, { passive: false });
  window.addEventListener("touchmove", preventDefaultScroll, {
    passive: false,
  });

  // Fungsi membuka undangan (menutup modal & aktifkan kembali scroll)
  closeModalBtn.addEventListener("click", () => {
    // Sembunyikan modal
    welcomeModal.classList.add("hidden");

    // Buka kunci scroll
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
    window.removeEventListener("wheel", preventDefaultScroll);
    window.removeEventListener("touchmove", preventDefaultScroll);

    // Mulai Animasi
    document.body.classList.add("invitation-opened");
  });

  const scrollRevealElements = document.querySelectorAll(
    ".ringkasan-section, .gallery-wrapper, .when-where-wrapper, .sessions-wrapper, footer",
  );
  const itemRevealElements = document.querySelectorAll(
    ".gallery-item, .session-item, .speaker-card",
  );
  const allRevealElements = [...scrollRevealElements, ...itemRevealElements];

  if ("IntersectionObserver" in window) {
    const scrollRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    allRevealElements.forEach((element) => {
      scrollRevealObserver.observe(element);
    });
  } else {
    allRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Galeri
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  // Buka lightbox saat gambar di galeri diklik
  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  // Tutup lightbox saat tombol (X) diklik
  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  // Tutup lightbox saat area hitam di luar gambar diklik
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }
});
