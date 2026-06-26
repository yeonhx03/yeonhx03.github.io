(function () {
  var grass = document.querySelector(".sidebar-github-grass");

  if (!grass) {
    return;
  }

  var isDragging = false;
  var startX = 0;
  var startScrollLeft = 0;
  var moved = false;

  grass.addEventListener(
    "wheel",
    function (event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      grass.scrollLeft += event.deltaY;
    },
    { passive: false }
  );

  grass.addEventListener("pointerdown", function (event) {
    if (event.button !== 0) {
      return;
    }

    isDragging = true;
    moved = false;
    startX = event.clientX;
    startScrollLeft = grass.scrollLeft;
    grass.classList.add("is-dragging");
    grass.setPointerCapture(event.pointerId);
  });

  grass.addEventListener("pointermove", function (event) {
    if (!isDragging) {
      return;
    }

    var delta = event.clientX - startX;
    if (Math.abs(delta) > 3) {
      moved = true;
    }

    grass.scrollLeft = startScrollLeft - delta;
  });

  grass.addEventListener("pointerup", function (event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    grass.classList.remove("is-dragging");
    grass.releasePointerCapture(event.pointerId);
  });

  grass.addEventListener("click", function (event) {
    if (moved) {
      event.preventDefault();
      moved = false;
    }
  });
})();
