(function () {
  var list = document.getElementById('zl');
  var count = document.getElementById('mn');
  var picked = [];
  var tick = '<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4" width="17" height="17" rx="2.5"/><path d="M6 12.5l4 4.5L22 3.5"/></svg>';

  function render() {
    if (!picked.length) {
      list.innerHTML = '<li class="empty">… noch leer, einfach antippen</li>';
    } else {
      // vorhandene Zeilen behalten, damit nur neue Wünsche „geschrieben“ werden
      var have = Array.prototype.map.call(list.querySelectorAll('li[data-w]'), function (li) { return li.getAttribute('data-w'); });
      Array.prototype.forEach.call(list.querySelectorAll('li'), function (li) {
        var w = li.getAttribute('data-w');
        if (!w || picked.indexOf(w) < 0) li.remove();
      });
      picked.forEach(function (w) {
        if (have.indexOf(w) < 0) {
          var li = document.createElement('li');
          li.setAttribute('data-w', w);
          li.innerHTML = tick + '<span></span>';
          li.lastChild.textContent = w;
          list.appendChild(li);
        }
      });
    }
    if (count) count.textContent = picked.length;
  }

  document.querySelectorAll('.wish').forEach(function (b) {
    b.addEventListener('click', function () {
      var w = b.getAttribute('data-wish');
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) picked.push(w); else picked.splice(picked.indexOf(w), 1);
      render();
    });
  });

  var file = document.querySelector('.file input');
  if (file) file.addEventListener('change', function () {
    if (file.files.length) file.nextElementSibling.nextElementSibling.textContent = file.files[0].name + ' angehängt';
  });

  document.getElementById('zf').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('zettel').classList.add('sent');
  });
})();
