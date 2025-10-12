/* ===============================
   student.js
   Handles all interactions for Student Dashboard
================================ */

// Utility
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Sample teacher data (you can replace this with API fetch)
const teachers = [
  {
    name: 'Dr. Aisha Khan',
    department: 'Computer Science',
    subject: 'Web Development',
  },
  {
    name: 'Prof. James Lee',
    department: 'Mathematics',
    subject: 'Algebra',
  },
  {
    name: 'Dr. Maya Patel',
    department: 'Physics',
    subject: 'Quantum Mechanics',
  },
];

// =====================
// Navigation Handling
// =====================
const navButtons = $$('.nav-btn');
const sections = $$('.section-content');

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active classes
    navButtons.forEach((b) => b.classList.remove('active'));
    sections.forEach((sec) => sec.classList.add('hidden'));

    // Add active to clicked tab and show section
    btn.classList.add('active');
    const target = btn.getAttribute('data-section');
    $(`#${target}`).classList.remove('hidden');
  });
});

// =====================
// Render Teacher Cards
// =====================
const teacherList = $('#teacher-list');
const teacherSelect = $('#teacher-select');
const messageTeacherSelect = $('#message-teacher-select');

function renderTeachers(list = teachers) {
  teacherList.innerHTML = '';
  teacherSelect.innerHTML = '<option value="">Select Teacher</option>';
  messageTeacherSelect.innerHTML = '<option value="">Select Teacher</option>';

  list.forEach((teacher, index) => {
    // Render card
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.innerHTML = `
      <h3>${teacher.name}</h3>
      <p><strong>Department:</strong> ${teacher.department}</p>
      <p><strong>Subject:</strong> ${teacher.subject}</p>
    `;
    teacherList.appendChild(card);

    // Add to dropdowns
    const option1 = document.createElement('option');
    option1.value = index;
    option1.textContent = teacher.name;
    teacherSelect.appendChild(option1);

    const option2 = option1.cloneNode(true);
    messageTeacherSelect.appendChild(option2);
  });
}

renderTeachers(); // Initial render

// =====================
// Search Teachers
// =====================
const searchInput = $('#search-input');
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(keyword) ||
      t.department.toLowerCase().includes(keyword) ||
      t.subject.toLowerCase().includes(keyword)
  );
  renderTeachers(filtered);
});

// =====================
// Book Appointment
// =====================
const appointmentForm = $('#appointment-form');
const appointmentConfirmation = $('#appointment-confirmation');

appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const teacherIndex = teacherSelect.value;
  const date = $('#appointment-date').value;
  const time = $('#appointment-time').value;

  if (!teacherIndex || !date || !time) return;

  const teacher = teachers[teacherIndex];
  console.log(`Booking with ${teacher.name} on ${date} at ${time}`);

  // You can send this to a backend here
  appointmentConfirmation.classList.remove('hidden');
  appointmentForm.reset();

  setTimeout(() => {
    appointmentConfirmation.classList.add('hidden');
  }, 4000);
});

// =====================
// Send Message
// =====================
const messageForm = $('#message-form');
const messageText = $('#message-text');
const messageConfirmation = $('#message-confirmation');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const teacherIndex = messageTeacherSelect.value;
  const message = messageText.value.trim();

  if (!teacherIndex || !message) return;

  const teacher = teachers[teacherIndex];
  console.log(`Message to ${teacher.name}: ${message}`);

  // Simulate sending to backend
  messageConfirmation.classList.remove('hidden');
  messageForm.reset();

  setTimeout(() => {
    messageConfirmation.classList.add('hidden');
  }, 4000);
});

// =====================
// Logout (optional)
$('#logout-btn').addEventListener('click', () => {
  alert('You have been logged out!');
  location.reload(); // or redirect to login
});
