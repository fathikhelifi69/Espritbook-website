// addBook.js - provides onClick validation and dynamic field checks
function validerFormulaire() {
  var form = document.getElementById('addBookForm');
  var title = form.title.value.trim();
  var author = form.author.value.trim();
  var pubDate = form.pubDate.value;
  var language = form.language.value || '';
  var status = form.status.value || '';
  var copies = form.copies.value;
  var category = form.category.value;

  var messages = [];
  if (!title || title.length < 3) messages.push('Le titre est obligatoire et doit contenir au moins 3 caractères.');

  var authorPattern = /^[A-Za-zÀ-ÿ' -]+$/;
  if (!author || author.length < 3) messages.push("L'auteur doit contenir au moins 3 caractères.");
  else if (!authorPattern.test(author)) messages.push("L'auteur ne doit contenir que des lettres et des espaces.");

  if (!pubDate) messages.push('La date de publication est obligatoire.');

  if (language !== 'AN' && language !== 'FR') messages.push('La langue doit être AN ou FR.');

  if (status !== 'Disponible' && status !== 'Indisponible') messages.push('Le statut doit être Disponible ou Indisponible.');

  var n = Number(copies);
  if (!copies || !Number.isInteger(n) || n < 1) messages.push('Le nombre d\'exemplaires doit être un entier positif (≥ 1).');

  if (!category) messages.push('La catégorie doit être choisie.');

  if (messages.length) {
    alert(messages.join('\n'));
    return false; // prevent submission
  }

  // no alert errors -> allow submit to continue (submit will be handled by submit listener)
  return true;
}

// Dynamic field checks (Part 3)
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('addBookForm');
  if (!form) return;

  var titleEl = document.getElementById('title');
  var authorEl = document.getElementById('author');
  var dateEl = document.getElementById('pubDate');
  var langEls = Array.from(form.elements['language']);

  function setFieldStatus(id, message, valid) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = message || (valid ? '✓' : '');
    el.classList.remove('error','success');
    el.classList.add(valid ? 'success' : 'error');
  }

  // Title keyup: realtime check >=3
  titleEl && titleEl.addEventListener('keyup', function () {
    var v = this.value.trim();
    if (v.length < 3) setFieldStatus('titleError', 'Le titre doit contenir au moins 3 caractères.', false);
    else setFieldStatus('titleError', 'Titre valide.', true);
  });

  // Author blur: check only when leaving field
  authorEl && authorEl.addEventListener('blur', function () {
    var v = this.value.trim();
    var pattern = /^[A-Za-zÀ-ÿ' -]+$/;
    if (!v || v.length < 3) setFieldStatus('authorError', "L'auteur doit contenir au moins 3 caractères.", false);
    else if (!pattern.test(v)) setFieldStatus('authorError', "L'auteur ne doit contenir que des lettres et des espaces.", false);
    else setFieldStatus('authorError', "Auteur valide.", true);
  });

  // Publication date change: must be strictly after today
  dateEl && dateEl.addEventListener('change', function () {
    var v = this.value;
    if (!v) { setFieldStatus('dateError','La date de publication est obligatoire.', false); return; }
    var picked = new Date(v + 'T00:00:00');
    var today = new Date(); today.setHours(0,0,0,0);
    if (picked <= today) setFieldStatus('dateError', 'La date doit être ultérieure à aujourd\'hui.', false);
    else setFieldStatus('dateError', 'Date valide.', true);
  });

  // Language change: show flag + color
  langEls.forEach(function (r) {
    r.addEventListener('change', function () {
      var lang = this.value;
      var el = document.getElementById('langError');
      if (!el) return;
      if (lang === 'FR') {
        el.innerHTML = '<span class="flag-fr">🇫🇷 Français</span>';
        el.classList.remove('error'); el.classList.add('success');
      } else if (lang === 'AN') {
        el.innerHTML = '<span class="flag-an">🇬🇧 English</span>';
        el.classList.remove('error'); el.classList.add('success');
      }
    });
  });

  // Submit handling: validate all fields and show inline messages (Part 2)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = form.title.value.trim();
    var author = form.author.value.trim();
    var pubDate = form.pubDate.value;
    var language = (form.elements['language'] && form.elements['language'].value) || '';
    var status = form.status.value || '';
    var copies = form.copies.value;
    var category = form.category.value;

    var valid = true;

    // Title
    if (!title || title.length < 3) { setFieldStatus('titleError', 'Le titre est obligatoire et doit contenir au moins 3 caractères.', false); valid = false; }
    else { setFieldStatus('titleError', 'Titre valide.', true); }

    // Author
    var authorPattern = /^[A-Za-zÀ-ÿ' -]+$/;
    if (!author || author.length < 3) { setFieldStatus('authorError', "L'auteur doit contenir au moins 3 caractères.", false); valid = false; }
    else if (!authorPattern.test(author)) { setFieldStatus('authorError', "L'auteur ne doit contenir que des lettres et des espaces.", false); valid = false; }
    else { setFieldStatus('authorError', 'Auteur valide.', true); }

    // Date
    if (!pubDate) { setFieldStatus('dateError', 'La date de publication est obligatoire.', false); valid = false; }
    else {
      var picked = new Date(pubDate + 'T00:00:00');
      var today = new Date(); today.setHours(0,0,0,0);
      if (picked <= today) { setFieldStatus('dateError', 'La date doit être ultérieure à aujourd\'hui.', false); valid = false; }
      else setFieldStatus('dateError', 'Date valide.', true);
    }

    // Language
    if (language !== 'AN' && language !== 'FR') { setFieldStatus('langError', 'La langue doit être AN ou FR.', false); valid = false; }
    else { /* already set by change handler with flag */ }

    // Status
    if (status !== 'Disponible' && status !== 'Indisponible') { setFieldStatus('copiesError', 'Le statut doit être Disponible ou Indisponible.', false); valid = false; }

    // Copies
    var n = Number(copies);
    if (!copies || !Number.isInteger(n) || n < 1) { setFieldStatus('copiesError', 'Le nombre d\'exemplaires doit être un entier positif (≥ 1).', false); valid = false; }
    else setFieldStatus('copiesError', 'Nombre valide.', true);

    // Category
    if (!category) { setFieldStatus('categoryError', 'La catégorie doit être choisie.', false); valid = false; }
    else setFieldStatus('categoryError', 'Catégorie choisie.', true);

    if (!valid) return; // don't submit

    // Success: show an alert and reset the form
    alert('Livre ajouté avec succès.');
    form.reset();
    // clear status fields
    ['titleError','authorError','dateError','langError','copiesError','categoryError'].forEach(function(id){
      var el = document.getElementById(id); if (el) { el.textContent=''; el.classList.remove('error','success'); }
    });
  });
});
