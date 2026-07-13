const isLocalFrontend = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  && window.location.port !== '5000';
const API_BASE_URL = window.location.protocol === 'file:' || isLocalFrontend
  ? 'http://localhost:5000/api/v1'
  : '/api/v1';

const jets = [
  {
    name: 'Cessna Citation XLS',
    image: 'images/xls.png',
    details: 'cessna-details.html',
    summary: 'Up to 8 passengers · 2,100 nm range'
  },
  {
    name: 'Gulfstream G650',
    image: 'images/G650.png',
    details: 'gulfstream-details.html',
    summary: 'Up to 18 passengers · 7,000 nm range'
  }
];

function initializeNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.nav-links');
  if (!toggle || !navigation) return;

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

function renderJets() {
  const container = document.querySelector('#jet-cards');
  if (!container) return;

  container.replaceChildren(...jets.map((jet) => {
    const article = document.createElement('article');
    article.className = 'jet-card';
    article.innerHTML = `
      <img src="${jet.image}" alt="${jet.name}" loading="lazy">
      <div class="jet-card-content">
        <h3>${jet.name}</h3>
        <p class="jet-meta">${jet.summary}</p>
        <a href="${jet.details}">View aircraft <span aria-hidden="true">→</span></a>
      </div>`;
    return article;
  }));
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message is-visible ${type}`;
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function sendRequest(path, data, token) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'The request could not be completed.');
  return result;
}

function initializeSignupForm() {
  const form = document.querySelector('#signup-form');
  if (!form) return;
  const message = document.querySelector('#form-message');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    button.textContent = 'Creating account…';
    try {
      const result = await sendRequest('/auth/signup', Object.fromEntries(new FormData(form)));
      localStorage.setItem('aljetToken', result.token);
      showMessage(message, 'Your account was created. You can now request a flight.', 'success');
      form.reset();
    } catch (error) {
      showMessage(message, `${error.message} Make sure the local API is running.`, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Create account';
    }
  });
}

function initializeSigninForm() {
  const form = document.querySelector('#signin-form');
  if (!form) return;
  const message = document.querySelector('#form-message');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    button.textContent = 'Signing in…';
    try {
      const result = await sendRequest('/auth/login', Object.fromEntries(new FormData(form)));
      localStorage.setItem('aljetToken', result.token);
      showMessage(message, 'Signed in successfully. Redirecting to booking…', 'success');
      window.setTimeout(() => { window.location.href = 'booking.html'; }, 700);
    } catch (error) {
      showMessage(message, `${error.message} Make sure the local API is running.`, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Sign in';
    }
  });
}

function initializeBookingForm() {
  const form = document.querySelector('#booking-form');
  if (!form) return;
  const date = form.querySelector('#departureDate');
  const message = document.querySelector('#form-message');
  const button = form.querySelector('button[type="submit"]');
  date.min = new Date().toISOString().slice(0, 10);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data.departure.trim().toLowerCase() === data.arrival.trim().toLowerCase()) {
      showMessage(message, 'Departure and arrival must be different.', 'error');
      return;
    }
    data.passengers = Number(data.passengers);
    button.disabled = true;
    button.textContent = 'Sending request…';
    try {
      await sendRequest('/bookings', data, localStorage.getItem('aljetToken'));
      showMessage(message, 'Your booking request was received. Our team will contact you shortly.', 'success');
      form.reset();
      date.min = new Date().toISOString().slice(0, 10);
    } catch (error) {
      const hint = error.message.toLowerCase().includes('sign in') ? ' Sign in first, then try again.' : ' Make sure the local API is running.';
      showMessage(message, error.message + hint, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Request a quote';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  renderJets();
  initializeSignupForm();
  initializeSigninForm();
  initializeBookingForm();
  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();
});
