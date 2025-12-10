// main.js – shared interactions for MORAI

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav toggle
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');

if (nav && toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLElement && t.matches('.nav-link')) {
      const href = t.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {\n  const videoThumbnails = document.querySelectorAll('.video-thumbnail');\n  videoThumbnails.forEach(video => {\n    video.addEventListener('mouseenter', () => video.play());\n    video.addEventListener('mouseleave', () => video.pause());\n  });
  // Video gallery toggle
  const showVideosBtn = document.getElementById('showVideosBtn');
  const videoGallery = document.getElementById('videoGallery');

  if (showVideosBtn && videoGallery) {
    showVideosBtn.addEventListener('click', function() {
      const isHidden = videoGallery.style.display === 'none' || !videoGallery.style.display;
      videoGallery.style.display = isHidden ? 'block' : 'none';
      this.textContent = isHidden ? 'Hide Videos' : 'Watch Our Works';
      
      // Smooth scroll to the video gallery when showing
      if (isHidden) {
        videoGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  const departmentChips = document.querySelectorAll('.department-chip');\n  const videoThumbnails = document.querySelectorAll('.video-thumbnail');\n\n  departmentChips.forEach(chip => {\n    chip.addEventListener('click', () => {\n      const department = chip.textContent.trim();\n      videoThumbnails.forEach(video => {\n        video.style.display = video.dataset.department === department ? 'block' : 'none';\n      });\n    });\n  });
  const designVideoGallery = document.getElementById('designVideoGallery');

  if (showDesignVideosBtn && designVideoGallery) {
    showDesignVideosBtn.addEventListener('click', function() {
      const isHidden = designVideoGallery.style.display === 'none' || !designVideoGallery.style.display;
      designVideoGallery.style.display = isHidden ? 'block' : 'none';
      this.textContent = isHidden ? 'Hide Videos' : 'Watch Our Works';

      if (isHidden) {
        designVideoGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  

  const lightbox = document.getElementById('lightbox');\n  const lightboxFrame = document.getElementById('lightboxFrame');\n  const lightboxClose = document.querySelector('.lightbox-close');\n\n  videoThumbnails.forEach(video => {\n    video.addEventListener('click', () => {\n      lightboxFrame.src = video.src;\n      lightbox.style.display = 'flex';\n    });\n  });\n\n  lightboxClose.addEventListener('click', () => {\n    lightbox.style.display = 'none';\n    lightboxFrame.src = '';\n  });
  if (designProjectSelect) {
    designProjectSelect.addEventListener('change', function() {
      const url = this.value;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        this.selectedIndex = 0;
      }
    });
  }

  // Simple scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.classList.add('reveal'); // initial state
    observer.observe(el);
  });

  const imageUpload = document.getElementById('imageUpload');
  const imageGallery = document.getElementById('imageGallery');
  if (imageUpload && imageGallery) {
    imageUpload.addEventListener('change', function() {
      imageGallery.innerHTML = '';
      const files = Array.from(this.files || []);
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        const card = document.createElement('div');
        card.className = 'media-card';
        const img = document.createElement('img');
        img.src = url;
        card.appendChild(img);
        imageGallery.appendChild(card);
      });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxFrame = document.getElementById('lightboxFrame');
  const lightboxClose = document.querySelector('#lightbox .lightbox-close');

  function extractDriveId(url) {
    const m = url.match(/\/d\/([^/]+)/);
    return m ? m[1] : null;
  }

  function openLightboxByUrl(url) {
    if (!lightbox || !lightboxFrame) return false;
    const id = extractDriveId(url);
    if (!id) return false;
    const embed = `https://drive.google.com/file/d/${id}/preview`;
    lightboxFrame.src = embed;
    lightbox.classList.add('open');
    return true;
  }

  function closeLightbox() {
    if (!lightbox || !lightboxFrame) return;
    lightbox.classList.remove('open');
    lightboxFrame.src = '';
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => closeLightbox());
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  const showcaseLinks = Array.from(document.querySelectorAll('.showcase-card[href]'));
  showcaseLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      const ok = openLightboxByUrl(href);
      if (ok) e.preventDefault();
    });
  });


  const introOverlay = document.getElementById('introOverlay');
  const introVideo = document.getElementById('introVideo');
  if (introOverlay && introVideo) {
    const hideIntro = () => {
      introOverlay.classList.add('hidden');
      setTimeout(() => {
        if (introOverlay && introOverlay.parentNode) introOverlay.parentNode.removeChild(introOverlay);
      }, 400);
    };
    const startIntro = () => {
      const p = introVideo.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    };
    introVideo.addEventListener('ended', hideIntro);
    if (introVideo.readyState >= 2) {
      startIntro();
    } else {
      introVideo.addEventListener('loadeddata', startIntro, { once: true });
    }
    setTimeout(hideIntro, 15000);
  }
});
