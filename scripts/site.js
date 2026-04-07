const video = document.getElementById("scrollVideo");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.5 // play when 50% visible
});

observer.observe(video);

document.addEventListener("DOMContentLoaded", () => {
  const sentences = [
    "Unclaiming all bad energy!",
    "Claiming good energy.",
    "Claim x 4.",
    "Claim with good energy only."
  ];

  const link = document.getElementById("flash-link");
  if (!link) return; // safety check

  let index = 0;

  function showNextSentence() {
    // fade out
    link.style.opacity = 0;

    setTimeout(() => {
      link.textContent = sentences[index]; // update text
      link.style.opacity = 1;              // fade in
      index = (index + 1) % sentences.length; // next sentence
    }, 500); // matches CSS fade duration
  }

  // start immediately
  showNextSentence();
  setInterval(showNextSentence, 2500);
});