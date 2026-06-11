const vinylButton = document.querySelector(".vinyl-player__button");
const vinylPlayer = document.querySelector(".vinyl-player");
const soundcloudFrame = document.querySelector(".vinyl-player__soundcloud");
const volumeControl = document.querySelector(".vinyl-player__volume-control");
const viewCount = document.querySelector(".vinyl-player__views-count");
const rightSidebar = document.querySelector(".right-sidebar");
const searchContent = document.querySelector(".search-content");
let soundcloudWidget;

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
  soundcloudWidget?.setVolume(volume);
};

const adjustVolume = (delta) => {
  setVolumeBar(clampVolume(volumeControl.value) + delta);
};

const setVolumeFromPointer = (event) => {
  const rect = volumeControl.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;

  setVolumeBar(Math.round(clampVolume(ratio * 100)));
};

const syncSoundcloudVolume = () => {
  if (!volumeControl) {
    return;
  }

  setVolumeBar(volumeControl.value);
};

const setupSoundcloudWidget = () => {
  if (!soundcloudFrame || !window.SC) {
    return;
  }

  soundcloudWidget = window.SC.Widget(soundcloudFrame);
  soundcloudWidget.bind(window.SC.Widget.Events.READY, syncSoundcloudVolume);
};

setupSoundcloudWidget();

const setupGoatCounterViews = async () => {
  const code = viewCount?.dataset.goatcounterCode;

  if (!viewCount || !code) {
    return;
  }

  try {
    const response = await fetch(
      `https://${code}.goatcounter.com/counter/TOTAL.json`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (data.count) {
      viewCount.textContent = data.count;
    }
  } catch {
    viewCount.textContent = "--";
  }
};

setupGoatCounterViews();

const setupSearchSidebar = () => {
  if (!rightSidebar || !searchContent || !rightSidebar.parentNode) {
    return;
  }

  const placeholder = document.createComment("right-sidebar-placeholder");
  rightSidebar.before(placeholder);

  const syncSearchSidebar = () => {
    const isSearchVisible = searchContent.classList.contains("is--visible");

    if (isSearchVisible && rightSidebar.parentNode !== searchContent) {
      rightSidebar.classList.add("right-sidebar--search");
      searchContent.appendChild(rightSidebar);
      return;
    }

    if (!isSearchVisible && rightSidebar.parentNode === searchContent) {
      rightSidebar.classList.remove("right-sidebar--search");
      placeholder.after(rightSidebar);
    }
  };

  new MutationObserver(syncSearchSidebar).observe(searchContent, {
    attributeFilter: ["class"],
    attributes: true,
  });
};

setupSearchSidebar();

if (vinylButton) {
  vinylButton.addEventListener("click", () => {
    const isPlaying = vinylButton.classList.toggle("is-playing");

    vinylButton.setAttribute("aria-pressed", String(isPlaying));
    vinylButton.setAttribute(
      "aria-label",
      isPlaying ? "음악 정지" : "음악 재생"
    );

    soundcloudWidget?.[isPlaying ? "play" : "pause"]();
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
