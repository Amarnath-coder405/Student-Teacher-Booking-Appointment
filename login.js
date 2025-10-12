// ===============================
// login.js
// Handles Login form functionality
// ===============================

// Get references to DOM elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleSelect = document.getElementById('role');
const errorMsg = document.getElementById('error-msg');

/**
 * Validate email format using regex
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Display error message below the form
 * @param {string} message 
 */
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}

/**
 * Hide error message
 */
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

/**
 * Simulate login authentication (to be replaced with real API call)
 * @param {string} email 
 * @param {string} password 
 * @param {string} role 
 * @returns {Promise<boolean>}
 */
function authenticateUser(email, password, role) {
  // Dummy data for demonstration
  const dummyUsers = {
    student: { email: 'student@example.com', password: 'student123' },
    teacher: { email: 'teacher@example.com', password: 'teacher123' },
    admin: { email: 'admin@example.com', password: 'admin123' }
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        dummyUsers[role] &&
        dummyUsers[role].email === email &&
        dummyUsers[role].password === password
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000); // simulate network delay
  });
}

// Handle form submit
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const role = roleSelect.value;

  // Basic validation
  if (!email || !password || !role) {
    showError('Please fill out all fields.');
    return;
  }

  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // Disable form to prevent multiple submits
  loginForm.querySelector('button[type="submit"]').disabled = true;

  // Simulate authentication
  const isAuthenticated = await authenticateUser(email, password, role);

  if (isAuthenticated) {
    // Redirect based on role
    switch (role) {
      case 'student':
        window.location.href = 'student.html';
        break;
      case 'teacher':
        window.location.href = 'teacher.html';
        break;
      case 'admin':
        window.location.href = 'admin.html';
        break;
      default:
        showError('Invalid role selected.');
        loginForm.querySelector('button[type="submit"]').disabled = false;
    }
  } else {
    showError('Invalid email, password, or role.');
    loginForm.querySelector('button[type="submit"]').disabled = false;
  }
});
