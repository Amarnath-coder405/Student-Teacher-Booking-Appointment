/* ============================
   teacher.js
   Functionality for Teacher Dashboard
   ============================ */

// Utility: Select elements
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Tab Navigation
const navButtons = $$('.nav-btn');
const sections = $$('.section-content');

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active classes
    navButtons.forEach((b) => b.classList.remove('active'));
    sections.forEach((sec) => sec.classList.add('hidden'));

    // Activate clicked tab
    btn.classList.add('active');
    const target = btn.getAttribute('data-section');
    $(`#${target}`).classList.remove('hidden');
  });
});

// ====================
// Schedule Slots
// ====================
const scheduleForm = $('#schedule-form');
const slotDate = $('#slot-date');
const slotTime = $('#slot-time');
const slotsTableBody = $('#slots-table-body');

// Handle slot form submission
scheduleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = slotDate.value;
  const time = slotTime.value;

  if (!date || !time) return;

  const slot = { date, time };
  addSlotToDOM(slot);
  saveSlotToLocal(slot);

  // Clear form
  slotDate.value = '';
  slotTime.value = '';
});

// Render slot to table
function addSlotToDOM(slot) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${slot.date}</td>
    <td>${slot.time}</td>
    <td>
      <button class="action-btn delete-btn" onclick="removeSlot(this)">Delete</button>
    </td>
  `;
  slotsTableBody.appendChild(tr);
}

// Remove slot
function removeSlot(btn) {
  const row = btn.closest('tr');
  const date = row.children[0].textContent;
  const time = row.children[1].textContent;

  // Remove from localStorage
  const slots = getSlotsFromLocal().filter(
    (s) => !(s.date === date && s.time === time)
  );
  localStorage.setItem('teacher_slots', JSON.stringify(slots));

  // Remove from DOM
  row.remove();
}

// Local Storage Helpers
function getSlotsFromLocal() {
  return JSON.parse(localStorage.getItem('teacher_slots')) || [];
}

function saveSlotToLocal(slot) {
  const slots = getSlotsFromLocal();
  slots.push(slot);
  localStorage.setItem('teacher_slots', JSON.stringify(slots));
}

// Load slots on page load
window.addEventListener('DOMContentLoaded', () => {
  getSlotsFromLocal().forEach(addSlotToDOM);
  renderAppointments();
  renderMessages();
});

// ====================
// Appointments Section
// ====================
const apptTableBody = $('#appt-table-body');

// Sample appointment data (can be replaced with API)
const appointments = [
  {
    student: 'Alice Johnson',
    date: '2025-10-15',
    time: '10:00',
    status: 'Pending',
  },
  {
    student: 'Bob Smith',
    date: '2025-10-16',
    time: '11:30',
    status: 'Pending',
  },
];

function renderAppointments() {
  apptTableBody.innerHTML = ''; // Clear
  appointments.forEach((appt, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${appt.student}</td>
      <td>${appt.date}</td>
      <td>${appt.time}</td>
      <td>${appt.status}</td>
      <td>
        ${
          appt.status === 'Pending'
            ? `<button class="action-btn" onclick="updateAppointment(${index}, 'Approved')">Approve</button>
               <button class="action-btn delete-btn" onclick="updateAppointment(${index}, 'Cancelled')">Cancel</button>`
            : `<em>${appt.status}</em>`
        }
      </td>
    `;
    apptTableBody.appendChild(tr);
  });
}

function updateAppointment(index, status) {
  appointments[index].status = status;
  renderAppointments();
}

// ====================
// Messages Section
// ====================
const messagesList = $('#messages-list');

// Sample messages (can be fetched from backend)
const messages = [
  {
    from: 'Alice Johnson',
    message: 'Thank you for the appointment!',
  },
  {
    from: 'Bob Smith',
    message: 'Can we reschedule?',
  },
];

function renderMessages() {
  messagesList.innerHTML = ''; // Clear
  messages.forEach((msg) => {
    const div = document.createElement('div');
    div.classList.add('message-item');
    div.innerHTML = `
      <p><strong>${msg.from}:</strong> ${msg.message}</p>
    `;
    messagesList.appendChild(div);
  });
}

// ====================
// Logout Button (Optional - just reloads dashboard)
// ====================
$('#btn-logout').addEventListener('click', () => {
  alert('Logging out...');
  window.location.reload(); // You can redirect or clear session here
});
