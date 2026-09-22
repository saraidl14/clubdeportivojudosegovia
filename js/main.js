(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var heroArches = document.querySelector('.hero .arch-row');
  if (heroArches) {
    setTimeout(function () {
      heroArches.classList.add('is-built');
    }, 150);
  }

  var resultsToggle = document.getElementById('results-toggle');
  if (resultsToggle) {
    resultsToggle.addEventListener('click', function () {
      var extraRows = document.querySelectorAll('.results-table tbody tr.extra-row');
      var expanded = resultsToggle.getAttribute('aria-expanded') === 'true';
      extraRows.forEach(function (row) {
        row.classList.toggle('row-hidden', expanded);
      });
      resultsToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      resultsToggle.textContent = expanded ? 'Mostrar más' : 'Mostrar menos';
    });
  }
})();
