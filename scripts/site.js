const video = document.getElementById("scrollVideo");

if (video) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);

  const savedTime = localStorage.getItem("videoTime");
  if (savedTime) {
    const t = parseFloat(savedTime);
    localStorage.removeItem("videoTime");
    const seek = () => {
      video.currentTime = t;
      video.play();
    };
    if (video.readyState >= 2) {
      seek();
    } else {
      video.addEventListener("canplay", seek, { once: true });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sentences = [
    "Unclaiming all bad energy!",
    "Claiming good energy.",
    "Claim x 4.",
    "Claim with good energy only."
  ];

  const link = document.getElementById("flash-link");
  if (link) {
    let index = 0;

    function showNextSentence() {
      link.style.opacity = 0;
      setTimeout(() => {
        link.textContent = sentences[index];
        link.style.opacity = 1;
        index = (index + 1) % sentences.length;
      }, 500);
    }

    showNextSentence();
    setInterval(showNextSentence, 2500);

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const v = document.getElementById("scrollVideo");
      if (v) localStorage.setItem("videoTime", v.currentTime);
      document.body.style.transition = "opacity 0.8s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = link.href;
      }, 800);
    });
  }

  const backLink = document.getElementById("back-link");
  if (backLink) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      const v = document.getElementById("scrollVideo");
      if (v) localStorage.setItem("videoTime", v.currentTime);
      document.body.style.transition = "opacity 0.8s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = backLink.href;
      }, 800);
    });
  }
});