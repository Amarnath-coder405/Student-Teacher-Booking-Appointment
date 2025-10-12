// admin.js

/** ------------------------------
 * Mock Data (would come from backend in production)
 * ------------------------------ */
let teachers = [
  {
    name: "Alice Smith",
    department: "Mathematics",
    subject: "Algebra",
    status: "pending" // "pending" or "approved"
  },
  {
    name: "John Doe",
    department: "Science",
    subject: "Physics",
    status: "approved"
  }
];

let students = [
  {
    studentName: "Jennifer Lee",
    requestedTeacher: "Alice Smith",
    date: "2025-11-01",
    time: "09:00 AM",
    status: "pending"
  },
  {
    studentName: "Mark Brown",
    requestedTeacher: "John Doe",
    date: "2025-11-03",
    time: "02:00 PM",
    status: "approved"
  }
];

/** ------------------------------
 * DOM References
 * ------------------------------ */
const teacherForm = document.getElementById('teacher-form');
const inputName = document.getElementById('teacher-name');
const inputDept = document.getElementById('teacher-dept');
const inputSubject = document.getElementById('teacher-subject');
const cancelBtn = document.getElementById('teacher-cancel-btn');
const teacherTableBody = document.getElementById('teacher-table-body');
const studentTableBody = document.getElementById('student-table-body');

let editTeacherIndex = null; // holds index being edited, null if adding new

/** ------------------------------
 * FUNCTIONS
 * ------------------------------ */

/**
 * Render the teachers table from the `teachers` array
 */
function renderTeachers() {
  teacherTableBody.innerHTML = ''; // clear existing

  teachers.forEach((teacher, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${teacher.name}</td>
      <td>${teacher.department}</td>
      <td>${teacher.subject}</td>
      <td>
        <span class="status-badge status-${teacher.status}">
          ${teacher.status}
        </span>
      </td>
      <td>
        ${teacher.status === 'pending'
          ? `<button class="action-btn approve-btn" onclick="approveTeacher(${idx})">Approve</button>`
          : ``
        }
        <button class="action-btn edit-btn" onclick="startEditTeacher(${idx})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTeacher(${idx})">Delete</button>
      </td>
    `;
    teacherTableBody.appendChild(tr);
  });
}

/**
 * Render the students (registrations) table from `students` array
 */
function renderStudents() {
  studentTableBody.innerHTML = '';

  students.forEach((st, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${st.studentName}</td>
      <td>${st.requestedTeacher}</td>
      <td>${st.date}</td>
      <td>${st.time}</td>
      <td>
        <span class="status-badge status-${st.status}">
          ${st.status}
        </span>
      </td>
      <td>
        ${st.status === 'pending'
          ? `<button class="action-btn approve-btn" onclick="approveStudent(${idx})">Approve</button>`
          : ``
        }
      </td>
    `;
    studentTableBody.appendChild(tr);
  });
}

/**
 * Handle form submission to add or update a teacher
 */
teacherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const dept = inputDept.value.trim();
  const subject = inputSubject.value.trim();

  if (!name || !dept || !subject) {
    alert("All fields are required.");
    return;
  }

  if (editTeacherIndex !== null) {
    // Update existing teacher
    teachers[editTeacherIndex] = {
      ...teachers[editTeacherIndex],
      name,
      department: dept,
      subject: subject
    };
    editTeacherIndex = null;
    cancelBtn.classList.add('hidden');
  } else {
    // Add new teacher (status default pending)
    teachers.push({
      name,
      department: dept,
      subject,
      status: 'pending'
    });
  }

  teacherForm.reset();
  renderTeachers();
});

/**
 * Approve a teacher registration
 */
function approveTeacher(idx) {
  teachers[idx].status = 'approved';
  renderTeachers();
}

/**
 * Start editing a teacher (fills form)
 */
function startEditTeacher(idx) {
  const t = teachers[idx];
  inputName.value = t.name;
  inputDept.value = t.department;
  inputSubject.value = t.subject;
  editTeacherIndex = idx;
  cancelBtn.classList.remove('hidden');
}

/**
 * Cancel editing
 */
cancelBtn.addEventListener('click', () => {
  editTeacherIndex = null;
  teacherForm.reset();
  cancelBtn.classList.add('hidden');
});

/**
 * Delete teacher
 */
function deleteTeacher(idx) {
  if (confirm("Are you sure you want to delete this teacher?")) {
    teachers.splice(idx, 1);
    renderTeachers();
  }
}

/**
 * Approve student registration
 */
function approveStudent(idx) {
  students[idx].status = 'approved';
  renderStudents();
}

/** ------------------------------
 * INITIAL RENDER
 * ------------------------------ */
renderTeachers();
renderStudents();
