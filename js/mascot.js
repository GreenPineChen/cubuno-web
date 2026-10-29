(() => {
  const root = document.querySelector("[data-mascot]");
  if (!root) return;

  const smile = root.querySelector("[data-mascot-smile]");
  if (!smile) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  let busy = false;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const setSmile = (on) => {
    smile.classList.toggle("is-on", on);
  };

  async function blinkOnce() {
    setSmile(true);
    await wait(160 + 60);
    setSmile(false);
    await wait(160);
  }

  async function playBlink(doubleBlink) {
    if (busy) return;
    busy = true;
    try {
      await blinkOnce();
      if (doubleBlink) {
        await wait(120);
        await blinkOnce();
      }
    } finally {
      busy = false;
    }
  }

  async function loop() {
    await wait(800);
    while (true) {
      await playBlink(Math.random() < 0.3);
      await wait(2800 + Math.floor(Math.random() * 1600));
    }
  }

  root.addEventListener("click", () => {
    playBlink(true);
  });

  // preload closed eye
  const preload = new Image();
  preload.src = smile.currentSrc || smile.getAttribute("src") || "";

  loop();
})();
