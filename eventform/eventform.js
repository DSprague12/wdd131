const form = document.querySelector("#eventForm");
const eventDateInput = document.querySelector("#eventDate");
const attendeeTypeInput = document.querySelector("#attendeeType");
const attendeeCodeField = document.querySelector("#attendeeCodeField");
const attendeeCodeLabel = document.querySelector("#attendeeCodeLabel");
const attendeeCodeInput = document.querySelector("#attendeeCode");
const formMessage = document.querySelector("#formMessage");

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getLocalDateString(tomorrow);
}

function updateAttendeeCodeField() {
  const attendeeType = attendeeTypeInput.value;
  const isStudent = attendeeType === "student";
  const isGuest = attendeeType === "guest";

  attendeeCodeField.hidden = !isStudent && !isGuest;
  attendeeCodeLabel.textContent = isStudent ? "Student I#" : "Access Code";
  attendeeCodeInput.required = isStudent || isGuest;
  attendeeCodeInput.inputMode = isStudent ? "numeric" : "text";
  attendeeCodeInput.pattern = isStudent ? "[0-9]{9}" : "EVENT131";
  attendeeCodeInput.placeholder = isStudent ? "Enter your 9-digit ID number" : "Enter the event access code";
}

function showMessage(title, details, className) {
  formMessage.replaceChildren();
  formMessage.className = `form-message ${className}`;

  const heading = document.createElement("h2");
  heading.textContent = title;
  formMessage.append(heading);

  if (Array.isArray(details)) {
    const list = document.createElement("ul");
    details.forEach((detail) => {
      const item = document.createElement("li");
      item.textContent = detail;
      list.append(item);
    });
    formMessage.append(list);
    return;
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = details;
  formMessage.append(paragraph);
}

function validateForm() {
  const errors = [];
  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const email = form.elements.email.value.trim();
  const eventDate = eventDateInput.value;
  const attendeeType = attendeeTypeInput.value;
  const attendeeCode = attendeeCodeInput.value.trim();

  if (!firstName) {
    errors.push("Enter your first name.");
  }

  if (!lastName) {
    errors.push("Enter your last name.");
  }

  if (!email) {
    errors.push("Enter your email address.");
  } else if (!form.elements.email.validity.valid) {
    errors.push("Enter a valid email address.");
  }

  if (!eventDate) {
    errors.push("Choose an event date.");
  } else if (eventDate <= getLocalDateString()) {
    errors.push("Choose a date later than today.");
  }

  if (!attendeeType) {
    errors.push("Select whether you are a student or a guest.");
  } else if (attendeeType === "student" && !/^[0-9]{9}$/.test(attendeeCode)) {
    errors.push("Enter your 9-digit Student I#.");
  } else if (attendeeType === "guest" && attendeeCode !== "EVENT131") {
    errors.push("Enter the event access code EVENT131.");
  }

  return errors;
}

attendeeTypeInput.addEventListener("change", () => {
  updateAttendeeCodeField();
  formMessage.replaceChildren();
  formMessage.className = "form-message";
});

eventDateInput.min = getTomorrowDateString();
updateAttendeeCodeField();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = validateForm();
  if (errors.length > 0) {
    showMessage("Please fix the following:", errors, "form-message--error");
    return;
  }

  const ticketDetails = [
    `Attendee: ${form.elements.firstName.value.trim()} ${form.elements.lastName.value.trim()}`,
    `Email: ${form.elements.email.value.trim()}`,
    `Event date: ${eventDateInput.value}`,
    `Type: ${attendeeTypeInput.value === "student" ? "Student" : "Guest"}`
  ];

  showMessage("Ticket Created", ticketDetails, "form-message--success");
  form.reset();
  updateAttendeeCodeField();
  eventDateInput.min = getTomorrowDateString();
});
