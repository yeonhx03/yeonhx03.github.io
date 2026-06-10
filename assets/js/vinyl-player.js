const vinylButton = document.querySelector(".vinyl-player__button");
const vinylPlayer = document.querySelector(".vinyl-player");
const volumeControl = document.querySelector(".vinyl-player__volume-control");

const clampVolume = (value) => Math.min(100, Math.max(0, Number(value)));

const setVolumeBar = (value) => {
  if (!vinylPlayer || !volumeControl) {
    return;
  }

  const volume = clampVolume(value);

  volumeControl.value = String(volume);
  vinylPlayer.style.setProperty("--volume-level", `${volume}%`);
  vinylPlayer.dataset.volume = String(volume);
  volumeControl.setAttribute("aria-valuetext", `${volume}%`);
};

const adjustVolume = (delta) => {
  setVolumeBar(clampVolume(volumeControl.value) + delta);
};

const setVolumeFromPointer = (event) => {
  const rect = volumeControl.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;

  setVolumeBar(Math.round(clampVolume(ratio * 100)));
};

if (vinylButton) {
  vinylButton.addEventListener("click", () => {
    const isPlaying = vinylButton.classList.toggle("is-playing");

    vinylButton.setAttribute("aria-pressed", String(isPlaying));
    vinylButton.setAttribute(
      "aria-label",
      isPlaying ? "음악 정지" : "음악 재생"
    );
  });
}

if (volumeControl) {
  setVolumeBar(volumeControl.value);

  volumeControl.addEventListener("input", (event) => {
    setVolumeBar(event.target.value);
  });

  volumeControl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      adjustVolume(-5);
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      adjustVolume(5);
    }
  });

  volumeControl.addEventListener("pointerdown", (event) => {
    setVolumeFromPointer(event);
  });
}
