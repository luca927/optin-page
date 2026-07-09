const form = document.getElementById('optin-form');
const MAILERLITE_FORM_ID = '191347024419882062';
const MAILERLITE_ACCOUNT_ID = '2457687';

function showError(input, message) {
  const errorEl = input.parentElement.querySelector('.error-msg');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
  input.classList.add('border-red-500');
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => {
    el.textContent = '';
    el.classList.add('hidden');
  });
  document.querySelectorAll('input').forEach(el => el.classList.remove('border-red-500'));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function submitToMailerLite({ name, email }) {
  const params = new URLSearchParams();
  params.append('fields[name]', name);
  params.append('fields[email]', email);
  params.append('ml-submit', '1');
  params.append('anticsrf', 'true');
  params.append('ajax', '1');
  params.append('guid', generateGuid());
  params.append('_', Date.now());

  const url = `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT_ID}/forms/${MAILERLITE_FORM_ID}/subscribe?${params.toString()}`;

  return fetch(url, { method: 'GET', mode: 'no-cors' });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const privacy = document.getElementById('privacy');

  let valid = true;

  if (nome.value.trim() === '') {
    showError(nome, 'Inserisci il tuo nome.');
    valid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, 'Inserisci un\'email valida.');
    valid = false;
  }

  if (!privacy.checked) {
    showError(privacy, 'Devi accettare la Privacy Policy per proseguire.');
    valid = false;
  }

  if (!valid) return;

  submitToMailerLite({
    name: nome.value.trim(),
    email: email.value.trim(),
  })
    .then(() => {
      window.location.href = 'grazie.html';
    })
    .catch((err) => {
      console.error('Errore iscrizione MailerLite:', err);
      window.location.href = 'grazie.html';
    });
});