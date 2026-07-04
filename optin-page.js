const form = document.getElementById('optin-form');
const MAILERLITE_ACTION_URL = 'https://assets.mailerlite.com/jsonp/2457687/forms/CxHLBG/subscribe';

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


const formData = new URLSearchParams();
formData.append('fields[name]', nome.value.trim());
formData.append('fields[email]', email.value.trim());
formData.append('ml-submit', '1');
formData.append('anticsrf', 'true');

fetch(MAILERLITE_ACTION_URL, {
  method: 'POST',
  mode: 'no-cors', // la risposta resta "opaca", non leggibile via JS
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formData.toString()
})
.finally(() => {
  window.location.href = 'grazie.html';
});
})