const vinylButton = document.querySelector(".vinyl-player__button");

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