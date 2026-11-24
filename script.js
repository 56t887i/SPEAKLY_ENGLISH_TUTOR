const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Все четыре направления всегда отображаются на странице.

// Слайдер отзывов
const track = document.querySelector('.review-track');
const reviewCards = [...document.querySelectorAll('.review-card')];
let reviewIndex = 0;

function visibleReviews() {
  return window.innerWidth <= 760 ? 1 : 3;
}
function moveReviews() {
  const maxIndex = Math.max(0, reviewCards.length - visibleReviews());
  reviewIndex = Math.min(reviewIndex, maxIndex);
  const gap = 16;
  const cardWidth = reviewCards[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
}
document.querySelector('.review-next').addEventListener('click', () => {
  const maxIndex = Math.max(0, reviewCards.length - visibleReviews());
  reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
  moveReviews();
});
document.querySelector('.review-prev').addEventListener('click', () => {
  const maxIndex = Math.max(0, reviewCards.length - visibleReviews());
  reviewIndex = reviewIndex <= 0 ? maxIndex : reviewIndex - 1;
  moveReviews();
});
window.addEventListener('resize', moveReviews);

// Маска российского номера телефона
const phoneInput = document.querySelector('#phone');
phoneInput.addEventListener('input', () => {
  let digits = phoneInput.value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7') && digits.length) digits = '7' + digits;
  digits = digits.slice(0, 11);
  let formatted = '+7';
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) formatted += ')';
  if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
  if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
  if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
  phoneInput.value = formatted;
});

// Демонстрационная отправка формы — без подключения к серверу
const form = document.querySelector('#contactForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const success = form.querySelector('.form-success');
  if (!form.reportValidity()) return;
  success.textContent = 'Спасибо! Форма работает в демо-режиме. Подключите мессенджер или CRM для получения заявок.';
  form.reset();
});

moveReviews();