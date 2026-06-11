(function () {
  var count = document.querySelector(".sidebar-views__count");
  var code = count && count.dataset.goatcounterCode;

  if (!count || !code) {
    return;
  }

  fetch("https://" + code + ".goatcounter.com/counter/TOTAL.json")
    .then(function (response) {
      return response.ok ? response.json() : null;
    })
    .then(function (data) {
      if (data && data.count) {
        count.textContent = data.count;
      }
    })
    .catch(function () {
      count.textContent = "--";
    });
}());
