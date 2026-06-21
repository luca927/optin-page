const form = document.getElementById('optin-form');

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

  // QUI andrà la chiamata reale al servizio di email marketing
  // (es. ActiveCampaign, MailerLite, Brevo, Mailchimp...) tramite fetch() a un endpoint/API.
  // Esempio indicativo (da adattare al provider scelto dalla cliente):
  //
  // fetch('https://endpoint-del-provider.com/api/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     nome: nome.value.trim(),
  //     email: email.value.trim(),
  //     marketing: document.getElementById('marketing').checked
  //   })
  // })
  // .then(res => {
  //   if (res.ok) window.location.href = 'grazie.html';
  //   else showError(email, 'Qualcosa è andato storto, riprova.');
  // });

  // Per ora, finché non c'è un provider collegato, reindirizziamo direttamente.
  window.location.href = 'grazie.html';
});