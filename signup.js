// ===============================
// signup.js
// Handles sign-up form logic
// ===============================

// Get form and inputs
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const successMessage = document.getElementById('signup-success');

// Utility function to show success message
function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.remove('hidden');

  // Hide after 5 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

// Utility function to validate email
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Form submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Basic Validation
  if (!name || !email || !role || !password || !confirmPassword) {
    alert('Please fill out all fields.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters.');
    return;
  }

  // Simulate form submission (could be sent to backend/API)
  const formData = {
    name,
    email,
    role,
    password,
  };

  console.log('✅ Account created:', formData);

  // Reset form
  form.reset();
  showSuccess('Account created successfully! ✅');

  // Optional: Redirect after delay
  // setTimeout(() => {
  //   window.location.href = 'login.html';
  // }, 3000);
});
