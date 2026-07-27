(function () {
  "use strict";

  var storageKey = "blog-theme";
  var root = document.documentElement;

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function updateThemeColor(theme) {
    var themeColor = document.getElementById("theme-color");

    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#0D0F0E" : "#F7F7F5");
    }
  }

  function applyTheme(theme, persist) {
    var nextTheme = theme === "dark" ? "dark" : "light";
    var input = document.querySelector(".theme-toggle__input");

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    updateThemeColor(nextTheme);

    if (input) {
      input.checked = nextTheme === "dark";
      input.setAttribute(
        "aria-label",
        nextTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
      );
      input.title = input.getAttribute("aria-label");
    }

    if (persist) {
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The selected theme still applies for the current page when storage is unavailable.
      }
    }
  }

  function mountToggle() {
    var sidebar = document.querySelector(".sidebar");
    var authorProfile = sidebar && sidebar.querySelector(".author__avatar");
    var sidebarCategories = sidebar && sidebar.querySelector(".sidebar-categories");

    if (!sidebar || !authorProfile || sidebar.querySelector(".theme-toggle")) {
      return;
    }

    var container = document.createElement("div");
    container.className = "theme-toggle";
    container.innerHTML = [
      '<label class="theme-toggle__switch">',
      '<input class="theme-toggle__input" type="checkbox" role="switch">',
      '<span class="theme-toggle__track" aria-hidden="true">',
      '<span class="theme-toggle__thumb"></span>',
      '<svg class="theme-toggle__icon theme-toggle__sun" viewBox="0 0 24 24" fill="none">',
      '<circle cx="12" cy="12" r="4"></circle>',
      '<path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>',
      '</svg>',
      '<svg class="theme-toggle__icon theme-toggle__moon" viewBox="0 0 24 24" fill="none">',
      '<path d="M20.5 14.1A8 8 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z"></path>',
      '</svg>',
      '</span>',
      '</label>'
    ].join("");

    if (sidebarCategories) {
      sidebar.insertBefore(container, sidebarCategories);
    } else {
      authorProfile.insertAdjacentElement("afterend", container);
    }

    var input = container.querySelector(".theme-toggle__input");
    input.addEventListener("change", function () {
      applyTheme(input.checked ? "dark" : "light", true);
    });

    applyTheme(currentTheme(), false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle, { once: true });
  } else {
    mountToggle();
  }

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      applyTheme(event.newValue === "dark" ? "dark" : "light", false);
    }
  });
}());
