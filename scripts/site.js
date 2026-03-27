gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const video = document.getElementById("scrollVideo");

  video.addEventListener("loadedmetadata", () => {

    gsap.to(video, {
      currentTime: video.duration,
      ease: "none",
      scrollTrigger: {
        trigger: ".text-frame",   // scroll area
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

  });
});