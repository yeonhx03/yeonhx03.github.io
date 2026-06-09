(function () {
  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function renderResult(item) {
    var excerpt = String(item.excerpt || "").split(/\s+/).slice(0, 24).join(" ");
    return [
      '<div class="list__item">',
      '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">',
      '<h2 class="archive__item-title" itemprop="headline">',
      '<a href="' + escapeHtml(item.url) + '" rel="permalink">' + escapeHtml(item.title) + "</a>",
      "</h2>",
      '<p class="archive__item-excerpt" itemprop="description">' + escapeHtml(excerpt) + "...</p>",
      "</article>",
      "</div>"
    ].join("");
  }

  function initSearch() {
    var input = document.getElementById("search");
    var results = document.getElementById("results");

    if (!input || !results || !window.lunr || !window.store) {
      return false;
    }

    results.setAttribute("aria-live", "polite");

    var index = window.lunr(function () {
      this.field("title");
      this.field("excerpt");
      this.field("categories");
      this.field("tags");
      this.ref("id");
      this.pipeline.remove(window.lunr.trimmer);

      for (var item in window.store) {
        this.add({
          title: window.store[item].title,
          excerpt: window.store[item].excerpt,
          categories: window.store[item].categories,
          tags: window.store[item].tags,
          id: item
        });
      }
    });

    input.addEventListener("input", function () {
      var query = input.value.trim().toLowerCase();

      if (!query) {
        results.innerHTML = "";
        return;
      }

      var matches = index.query(function (q) {
        query.split(window.lunr.tokenizer.separator).forEach(function (term) {
          if (!term) {
            return;
          }

          q.term(term, { boost: 100 });
          q.term(term, {
            boost: 10,
            usePipeline: false,
            wildcard: window.lunr.Query.wildcard.TRAILING
          });
          q.term(term, {
            boost: 1,
            editDistance: 1,
            usePipeline: false
          });
        });
      });

      results.innerHTML =
        '<p class="results__found">' + matches.length + " Result(s) found</p>" +
        matches.map(function (match) {
          return renderResult(window.store[match.ref]);
        }).join("");
    });

    return true;
  }

  function bootSearch() {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;

      if (initSearch() || attempts >= 20) {
        window.clearInterval(timer);
      }
    }, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSearch);
  } else {
    bootSearch();
  }
}());
