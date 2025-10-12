// main.js — Toggle mobile navigation menu

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

      mainNav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    });
  }
});
